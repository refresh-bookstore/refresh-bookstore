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
  Tags,
} from "tsoa";
import { CategoryService } from "../services/category.service";
import { CategoryDTO } from "../dtos/category/category.dto";
import { CreateCategory } from "../dtos/category/create.category";

@Tags("Category")
@Route("category")
export class CategoryController extends Controller {
  private categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  @Post("")
  @Security("sessionAuth", ["isAdmin"])
  public async createCategory(
    @Body() createCategory: CreateCategory
  ): Promise<CategoryDTO> {
    return await this.categoryService.createCategory(createCategory);
  }

  @Get("")
  public async getCategoryList(): Promise<CategoryDTO[]> {
    return await this.categoryService.getCategories();
  }

  @Get("{id}")
  public async getCategoryById(@Path() id: string): Promise<CategoryDTO> {
    return await this.categoryService.getCategory(id);
  }

  @Put("")
  @Security("sessionAuth", ["isAdmin"])
  public async updateCategory(
    @Body() category: CategoryDTO
  ): Promise<CategoryDTO> {
    return await this.categoryService.updateCategory(category);
  }

  @Delete("")
  @Security("sessionAuth", ["isAdmin"])
  public async deleteCategory(@Query() id: string): Promise<CategoryDTO> {
    return await this.categoryService.removeCategory(id);
  }
}
