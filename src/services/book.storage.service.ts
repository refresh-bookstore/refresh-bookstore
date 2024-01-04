import axios from "axios";
import cron from "node-cron";
import { ProductService } from "./product.service";
import { ProductDTO } from "../dtos/product/product.dto";
import {
  ConflictException,
  InternalServerErrorException,
} from "../exceptions/http.exception";

interface BookData {
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  isbn13: string;
  priceSales: number;
  categoryName: string;
}

export class BookStorageService {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
    this.scheduleFetchAndStore();
  }

  lastExecutionDate = new Date();

  scheduleFetchAndStore() {
    cron.schedule(
      "20 12 * * *",
      () => {
        console.log("매일 12시 20분에 작업을 실행합니다.");
      },
      {
        scheduled: true,
        timezone: "Asia/Seoul",
      }
    );
  }

  async fetchDataAndStore() {
    const categoryIds = process.env.CATEGORY_IDS.split(",").map(Number);
    const queryTypes = process.env.QUERY_TYPES.split(",");
    const API_ENDPOINT = process.env.API_ENDPOINT;
    const API_KEY = process.env.API_KEY;

    for (const queryType of queryTypes) {
      for (const categoryId of categoryIds) {
        let totalResults = 0;
        let currentPage = 1;
        let totalPages = 0;

        do {
          const response = await axios.get(API_ENDPOINT, {
            params: {
              ttbkey: API_KEY,
              QueryType: queryType,
              MaxResults: 50,
              categoryId: categoryId,
              start: currentPage,
              SearchTarget: "Book",
              output: "js",
              outofStockfilter: 1,
              Version: "20131101",
            },
          });

          const data = response.data;
          totalResults = data.totalResults;
          totalPages = Math.ceil(totalResults / 50);

          const books = data.item;
          for (const book of books) {
            if (Math.random() < 0.2) {
              book.stock = 0;
            }

            const productDTO = this.mapToProductDTO(book);
            await this.storeProductData(productDTO);
          }

          currentPage++;
        } while (currentPage <= totalPages);
      }
    }
  }

  mapToProductDTO(book: BookData): ProductDTO {
    const productDTO = new ProductDTO();

    productDTO.title = book.title;

    const authors = book.author.split(", ");
    if (authors.length > 1) {
      productDTO.author = authors.slice(0, 1).join(", ") + " 등";
    } else {
      productDTO.author = authors.join(", ");
    }

    productDTO.publisher = book.publisher;
    productDTO.publicationDate = new Date(book.pubDate);
    productDTO.isbn = book.isbn13;

    const CONTENT_BASE_URL = process.env.CONTENT_BASE_URL;
    const isbnLastThree = book.isbn13.slice(-3);
    productDTO.description = `<img src="${CONTENT_BASE_URL}/sih/fit-in/814x0/dtl/illustrate/${isbnLastThree}/i${book.isbn13}.jpg" alt="책 이미지">`;

    productDTO.price = book.priceSales;
    productDTO.stock = 50;
    productDTO.imagePath = `${CONTENT_BASE_URL}/sih/fit-in/458x0/pdt/${book.isbn13}.jpg`;

    productDTO.category = this.extractLastCategory(book.categoryName);

    return productDTO;
  }

  extractLastCategory(categoryName: string): string {
    const categories = categoryName.split(">");
    return categories.pop() || "";
  }

  async storeProductData(productDTO: ProductDTO) {
    try {
      await this.productService.createProduct(productDTO);
    } catch (error) {
      if (!(error instanceof ConflictException)) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
