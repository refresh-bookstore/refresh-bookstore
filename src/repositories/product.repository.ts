import { PrismaClient, Product } from "@prisma/client";
import { CategoryRepository } from "./category.repository";
import { ProductDTO } from "../dtos/product/product.dto";
import { ProductResponse } from "../dtos/product/product.response";
import { UpdateProduct } from "../dtos/product/update.product";
import { NotFoundException } from "../exceptions/http.exception";
const prisma = new PrismaClient();

export class ProductRepository {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async create(productDTO: ProductDTO): Promise<Product | null> {
    return await prisma.$transaction(async (transaction) => {
      let category = await this.categoryRepository.findByName(
        productDTO.category
      );

      if (!category) {
        category = await this.categoryRepository.create(productDTO.category);
        console.log("Created new category:", category);
      }

      const { category: _, ...productData } = productDTO;

      try {
        const createdProduct = await transaction.product.create({
          data: {
            ...productData,
            categoryId: category.id,
          },
        });
        return createdProduct;
      } catch (error) {
        console.error("Error creating product:", error);
        throw error;
      }
    });
  }

  async update(isbn: string, updateProduct: UpdateProduct): Promise<Product> {
    return await prisma.$transaction(async (transaction) => {
      let category = await this.categoryRepository.findByName(
        updateProduct.category
      );

      if (!category) {
        category = await this.categoryRepository.create(updateProduct.category);
      }

      const { category: _, ...productData } = updateProduct;

      return await transaction.product.update({
        where: { isbn },
        data: {
          ...productData,
          categoryId: category.id,
        },
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
      (product) => new ProductResponse(product, product.Category.name)
    );
  }

  async findByISBN(isbn: string): Promise<ProductResponse | null> {
    const product = await prisma.product.findUnique({
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
              search: searchTerm,
            },
          },
          {
            author: {
              search: searchTerm,
            },
          },
          {
            publisher: {
              search: searchTerm,
            },
          },
        ],
      },
      include: {
        Category: { select: { name: true } },
      },
    });

    return products.map(
      (product) => new ProductResponse(product, product.Category.name)
    );
  }
}
