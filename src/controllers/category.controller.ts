import {
  Controller,
  Route,
  Get,
  Post,
  Body,
  Path,
  Put,
  Delete,
  Query,
  Security,
} from "tsoa";
import { CategoryService } from "../services/category.service";
import { Category } from "../dtos/category";
import { CreateCategory } from "../dtos/create.category";

@Route("")
export class CategoryController extends Controller {
  private categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  @Post("user-admin/category")
  @Security("sessionAuth", ["isAdmin"])
  public async createCategory(
    @Body() createUpdateCategory: CreateCategory
  ): Promise<Category> {
    return await this.categoryService.createCategory(createUpdateCategory);
  }

  @Get("category")
  public async getCategoryList(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Get("category/{id}")
  public async getCategoryById(@Path() id: string): Promise<Category> {
    return await this.categoryService.getCategory(id);
  }

  @Get("user-admin/categories")
  @Security("sessionAuth", ["isAdmin"])
  public async getAdminCategoryList(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Get("user-admin/category")
  @Security("sessionAuth", ["isAdmin"])
  public async getAdminCategoryQueryById(
    @Query() id: string
  ): Promise<Category> {
    return await this.categoryService.getCategory(id);
  }

  @Put("user-admin/category")
  @Security("sessionAuth", ["isAdmin"])
  public async updateCategory(@Body() category: Category): Promise<Category> {
    return await this.categoryService.updateCategory(category);
  }

  @Delete("user-admin/category")
  @Security("sessionAuth", ["isAdmin"])
  public async deleteCategory(@Query() id: string): Promise<Category> {
    return await this.categoryService.removeCategory(id);
  }
}
