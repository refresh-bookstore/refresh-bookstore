import { PrismaClient, Product } from "@prisma/client";
import { CreateProductDto } from "../dtos/product/create.product.dto";
const prisma = new PrismaClient();

export class ProductRepository {
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await prisma.product.create({
      data: {
        ...createProductDto,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async findByISBN(isbn: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { isbn },
    });
  }

  async update(productId: string, updateData: any): Promise<Product> {
    return await prisma.product.update({
      where: { productId },
      data: updateData,
    });
  }

  async delete(productId: string): Promise<Product> {
    return await prisma.product.delete({
      where: { productId },
    });
  }
}
