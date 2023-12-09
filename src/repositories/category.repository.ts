import { PrismaClient } from "@prisma/client";
import { CategoryDTO } from "../dtos/category/category.dto";
const prisma = new PrismaClient();

export class CategoryRepository {
  async create(name: string): Promise<CategoryDTO> {
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

  async findAll(): Promise<CategoryDTO[]> {
    return await prisma.category.findMany({
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async findByCategoryId(categoryId: string): Promise<CategoryDTO | null> {
    return await prisma.category.findUnique({
      where: { categoryId },
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async findByName(name: string): Promise<CategoryDTO | null> {
    return await prisma.category.findFirst({
      where: { name },
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async update(categoryId: string, name: string): Promise<CategoryDTO> {
    return await prisma.category.update({
      where: { categoryId },
      data: { name },
      select: {
        categoryId: true,
        name: true,
      },
    });
  }

  async delete(categoryId: string): Promise<CategoryDTO> {
    return await prisma.category.delete({
      where: { categoryId },
    });
  }
}
