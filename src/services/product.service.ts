import { ProductRepository } from "../repositories/product.repository";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "../exceptions/http.exception";
import { ProductDTO } from "../dtos/product/product.dto";
import { ProductResponse } from "src/dtos/product/product.response";
import { UpdateProduct } from "../dtos/product/update.product";

export class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
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

  async getProducts(): Promise<ProductResponse[]> {
    return await this.productRepository.findAll();
  }

  async searchProducts(keyword: string): Promise<ProductResponse[]> {
    return await this.productRepository.searchProducts(keyword);
  }

  async getProduct(isbn: string): Promise<ProductResponse> {
    return await this.getProductOrThrow(isbn);
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
