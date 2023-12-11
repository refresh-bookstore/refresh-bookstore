import { CreateProductDto } from "../dtos/product/create.product.dto";
import { Product } from "@prisma/client";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.create(createProductDto);
  }
}
