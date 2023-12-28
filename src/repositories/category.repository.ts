import { PrismaClient } from "@prisma/client";
import type { Category } from "@prisma/client";

const prisma = new PrismaClient();

interface CategoryContext {
  category: {
    findFirst: PrismaClient["category"]["findFirst"];
    create: PrismaClient["category"]["create"];
  };
}

export class CategoryRepository {
  private context: CategoryContext;

  constructor() {
    this.context = { category: prisma.category };
  }

  async create(
    name: string,
    context: CategoryContext = this.context,
  ): Promise<Category> {
    return await context.category.create({
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

  async findByName(
    name: string,
    context: CategoryContext = this.context,
  ): Promise<Category | null> {
    return await context.category.findFirst({
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
