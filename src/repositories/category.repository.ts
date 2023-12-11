import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryRepository {
  async create(name: string): Promise<Category> {
    return await prisma.category.create({
      data: { name },
    });
  }

  async findAll(): Promise<Category[]> {
    return await prisma.category.findMany();
  }

  async findByCategoryId(categoryId: string): Promise<Category | null> {
    return await prisma.category.findUnique({
      where: { categoryId },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return await prisma.category.findFirst({
      where: { name },
    });
  }

  async update(categoryId: string, name: string): Promise<Category> {
    return await prisma.category.update({
      where: { categoryId },
      data: { name },
    });
  }

  async delete(categoryId: string): Promise<Category> {
    return await prisma.category.delete({
      where: { categoryId },
    });
  }
}
