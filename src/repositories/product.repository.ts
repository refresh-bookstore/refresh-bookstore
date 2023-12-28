import { PrismaClient, Product } from "@prisma/client";
import { CategoryRepository } from "./category.repository";
import { ProductDTO } from "../dtos/product/product.dto";
import { ProductResponse } from "../dtos/product/product.response";
import { UpdateProduct } from "../dtos/product/update.product";
import { ProductPaginationResult } from "../dtos/product/product.pagincation.result";
import { GetProductsParams } from "../dtos/product/get.products.params";

const prisma = new PrismaClient();

interface ProductContext {
  product: {
    findUnique: PrismaClient["product"]["findUnique"];
  };
}

export class ProductRepository {
  private context: ProductContext;
  private categoryRepository: CategoryRepository;

  constructor() {
    this.context = { product: prisma.product };
    this.categoryRepository = new CategoryRepository();
  }

  async create(productDTO: ProductDTO): Promise<Product | null> {
    return await prisma.$transaction(async (transaction) => {
      let category = await this.categoryRepository.findByName(
        productDTO.category,
      );

      if (!category) {
        category = await this.categoryRepository.create(productDTO.category);
      }

      const productData = { ...productDTO };
      delete productData.category;

      const createdProduct = await transaction.product.create({
        data: {
          ...productData,
          categoryId: category.id,
        },
      });
      return createdProduct;
    });
  }

  async update(isbn: string, updateProduct: UpdateProduct): Promise<Product> {
    return await prisma.$transaction(async (transaction) => {
      let category;

      if (updateProduct.category) {
        category = await this.categoryRepository.findByName(
          updateProduct.category,
        );

        if (!category) {
          category = await this.categoryRepository.create(
            updateProduct.category,
          );
        }
      }

      const productData = { ...updateProduct };
      delete productData.category;

      const updateData = category
        ? { ...productData, categoryId: category.id }
        : productData;

      return await transaction.product.update({
        where: { isbn },
        data: updateData,
      });
    });
  }

  async findAll(): Promise<ProductResponse[]> {
    const products = await prisma.product.findMany({
      include: {
        Category: { select: { name: true } },
      },
    });

    return products.map(
      (product) => new ProductResponse(product, product.Category.name),
    );
  }

  async findByISBN(
    isbn: string,
    context: ProductContext = this.context,
  ): Promise<ProductResponse | null> {
    const product = await context.product.findUnique({
      where: { isbn },
      include: {
        Category: { select: { name: true } },
      },
    });

    if (!product) {
      return null;
    }

    return new ProductResponse(product, product.Category.name);
  }

  async getProduct(
    isbn: string,
    context: ProductContext = this.context,
  ): Promise<Product | null> {
    const product = await context.product.findUnique({
      where: { isbn },
      include: {
        Category: { select: { name: true } },
      },
    });

    if (!product) {
      return null;
    }

    return product;
  }

  async delete(isbn: string): Promise<Product> {
    return await prisma.product.delete({
      where: { isbn },
    });
  }

  async searchProducts(searchTerm: string): Promise<ProductResponse[]> {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
            },
          },
          {
            author: {
              contains: searchTerm,
            },
          },
          {
            publisher: {
              contains: searchTerm,
            },
          },
        ],
      },
      include: {
        Category: { select: { name: true } },
      },
    });

    return products.map(
      (product) => new ProductResponse(product, product.Category.name),
    );
  }

  async findByCategoryId(categoryId: number): Promise<ProductResponse[]> {
    const products = await prisma.product.findMany({
      where: { categoryId },
      include: {
        Category: { select: { name: true } },
      },
    });

    return products.map(
      (product) => new ProductResponse(product, product.Category.name),
    );
  }

  async findAndCount(
    params: GetProductsParams,
  ): Promise<ProductPaginationResult> {
    const { page, limit, searchTerm, isbn } = params;
    const offset = (page - 1) * limit;

    const whereConditions = {
      OR: [],
    };

    if (searchTerm) {
      whereConditions.OR.push(
        { title: { contains: searchTerm } },
        { author: { contains: searchTerm } },
        { publisher: { contains: searchTerm } },
      );
    }

    if (isbn) {
      whereConditions.OR.push({ isbn: { contains: isbn } });
    }

    const products = await prisma.product.findMany({
      skip: offset,
      take: limit,
      where: whereConditions.OR.length > 0 ? whereConditions : undefined,
      include: {
        Category: { select: { name: true } },
      },
    });

    const total = await prisma.product.count({
      where: whereConditions.OR.length > 0 ? whereConditions : undefined,
    });

    const productResponses = products.map(
      (product) => new ProductResponse(product, product.Category.name),
    );

    return new ProductPaginationResult(productResponses, total);
  }

  async checkStock(
    isbn: string,
    context: ProductContext = this.context,
  ): Promise<number> {
    const product = await context.product.findUnique({
      where: { isbn },
      select: { stock: true },
    });

    return product ? product.stock : 0;
  }
}
