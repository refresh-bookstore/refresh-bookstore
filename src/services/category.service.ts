import { CreateCategory } from "../dtos/create.category";
import { Category } from "./../dtos/category";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(createCategory: CreateCategory): Promise<Category> {
    const isCategory = await this.categoryRepository.findByName(
      createCategory.name
    );
    if (isCategory) {
      throw {
        status: 400,
        message: "이미 존재하는 카테고리입니다.",
      };
    }
    return await this.categoryRepository.create(createCategory.name);
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();
    if (categories.length === 0) {
      throw {
        status: 400,
        message: "카테고리가 존재하지 않습니다.",
      };
    }
    return categories;
  }

  async getCategory(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    if (!category) {
      throw {
        status: 400,
        message: "카테고리가 존재하지 않습니다.",
      };
    }
    return category;
  }

  async updateCategory(updateCategory: Category): Promise<Category> {
    const category = await this.categoryRepository.update(
      updateCategory.categoryId,
      updateCategory.name
    );
    return category;
  }

  async removeCategory(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.delete(categoryId);
    if (!category) {
      throw {
        status: 400,
        message: "삭제할 데이터가 없습니다.",
      };
    }
    return category;
  }
}
