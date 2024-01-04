import { CategoryService } from "./category.service";
import { ProductRepository } from "../repositories/product.repository";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "../exceptions/http.exception";
import { ProductDTO } from "../dtos/product/product.dto";
import { ProductResponse } from "../dtos/product/product.response";
import { UpdateProduct } from "../dtos/product/update.product";
import { ProductPaginationResult } from "src/dtos/product/product.pagincation.result";
import { GetProductsParams } from "src/dtos/product/get.products.params";

export class ProductService {
  private productRepository: ProductRepository;
  private categoryService: CategoryService;

  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryService = new CategoryService();
  }

  private async getProductOrThrow(isbn: string): Promise<ProductResponse> {
    const product = await this.productRepository.findByISBN(isbn);

    if (product === null) {
      throw new NotFoundException(
        `해당 ISBN을 '${isbn}'을 가진 상품이 존재하지 않습니다.`
      );
    }
    return product;
  }

  async createProduct(productDTO: ProductDTO): Promise<void> {
    const isExisting = await this.productRepository.findByISBN(productDTO.isbn);

    if (isExisting !== null) {
      throw new ConflictException(
        `${productDTO.title}은 이미 등록된 상품입니다.`
      );
    }

    await this.productRepository.create(productDTO);
  }

  async updateProduct(
    isbn: string,
    updateProduct: UpdateProduct
  ): Promise<void> {
    const existing = await this.getProductOrThrow(isbn);
    await this.productRepository.update(existing.isbn, updateProduct);
  }

  async getProducts(
    params: GetProductsParams
  ): Promise<ProductPaginationResult> {
    return this.productRepository.findAndCount(params);
  }

  async searchProducts(keyword: string): Promise<ProductResponse[]> {
    return await this.productRepository.searchProducts(keyword);
  }

  async getProduct(isbn: string): Promise<ProductResponse> {
    return await this.getProductOrThrow(isbn);
  }

  async getProductsByCategory(categoryId: string): Promise<ProductResponse[]> {
    const category = await this.categoryService.getCategoryOrThrow(categoryId);
    return await this.productRepository.findByCategoryId(category.id);
  }

  async deleteProduct(isbn: string): Promise<void> {
    const deleteData = await this.productRepository.delete(isbn);

    if (!deleteData) {
      throw new InternalServerErrorException(
        "제품 삭제 중 오류가 발생했습니다."
      );
    }
  }
}
