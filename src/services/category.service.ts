import { CreateCategory } from "../dtos/category/create.category";
import { CategoryDTO } from "../dtos/category/category.dto";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(createCategory: CreateCategory): Promise<CategoryDTO> {
    const isCategory = await this.categoryRepository.findByName(
      createCategory.name
    );
    if (isCategory) {
      throw new Error("이미 존재하는 카테고리입니다.");
    }
    return await this.categoryRepository.create(createCategory.name);
  }

  async getCategories(): Promise<CategoryDTO[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async getCategory(categoryId: string): Promise<CategoryDTO> {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    if (!category) {
      throw new Error("카테고리가 존재하지 않습니다.");
    }
    return category;
  }

  async updateCategory(updateCategory: CategoryDTO): Promise<CategoryDTO> {
    const category = await this.categoryRepository.update(
      updateCategory.categoryId,
      updateCategory.name
    );
    return category;
  }

  async removeCategory(categoryId: string): Promise<CategoryDTO> {
    const category = await this.categoryRepository.delete(categoryId);
    if (!category) {
      throw new Error("삭제할 데이터가 없습니다.");
    }
    return category;
  }
}
