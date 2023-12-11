import { CategoryRepository } from "../repositories/category.repository";
import { CategoryDTO } from "../dtos/category/category.dto";
import { Category } from "@prisma/client";
import {
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from "../exceptions/http.exception";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  private async getCategoryOrThrow(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    if (!category) {
      throw new NotFoundException(
        `카테고리 ID ${categoryId}는 존재하지 않습니다.`
      );
    }
    return category;
  }

  async createCategory(name: string): Promise<CategoryDTO> {
    const isExisting = await this.categoryRepository.findByName(name);

    if (isExisting) {
      throw new ConflictException(`카테고리 ${name}은(는) 이미 존재합니다.`);
    }

    const newCategory = await this.categoryRepository.create(name);

    if (!newCategory) {
      throw new InternalServerErrorException(
        "카테고리 생성 중 오류가 발생했습니다."
      );
    }

    return {
      name: newCategory.name,
      categoryId: newCategory.categoryId,
    };
  }
  async getCategories(): Promise<CategoryDTO[]> {
    const categories = await this.categoryRepository.findAll();

    return categories.map((category) => ({
      name: category.name,
      categoryId: category.categoryId,
    }));
  }

  async getCategory(categoryId: string): Promise<CategoryDTO> {
    const categoryData = await this.getCategoryOrThrow(categoryId);
    return {
      name: categoryData.name,
      categoryId: categoryData.categoryId,
    };
  }

  async updateCategory(updateCategory: CategoryDTO): Promise<void> {
    const existingCategory = await this.getCategoryOrThrow(
      updateCategory.categoryId
    );

    const updatedCategory = await this.categoryRepository.update(
      existingCategory.categoryId,
      updateCategory.name
    );

    if (!updatedCategory) {
      throw new InternalServerErrorException(
        "카테고리 업데이트 중 오류가 발생했습니다."
      );
    }
  }

  async removeCategory(categoryId: string): Promise<void> {
    const existingCategory = await this.getCategoryOrThrow(categoryId);

    const deleted = await this.categoryRepository.delete(
      existingCategory.categoryId
    );
    if (!deleted) {
      throw new InternalServerErrorException(
        "카테고리 삭제 중 오류가 발생했습니다."
      );
    }
  }
}
