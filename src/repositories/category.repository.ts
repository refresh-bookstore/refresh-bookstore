import { PrismaClient } from "@prisma/client";
import { Category } from "src/dtos/category";
const prisma = new PrismaClient();

export class CategoryRepository {
  async create(name: string): Promise<Category> {
    return await prisma.category.create({
      data: {
        name: name,
      },
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return await prisma.category.findMany({
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async findByCategoryId(categoryId: string): Promise<Category | null> {
    return await prisma.category.findUnique({
      where: { categoryId },
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return await prisma.category.findFirst({
      where: { name },
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async update(categoryId: string, name: string): Promise<Category> {
    return await prisma.category.update({
      where: { categoryId },
      data: { name },
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async delete(categoryId: string): Promise<Category> {
    return await prisma.category.delete({
      where: { categoryId },
    });
  }
}
