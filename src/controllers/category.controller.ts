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
  Middlewares,
} from "tsoa";
import { CategoryService } from "../services/category.service";
import { CategoryDTO } from "../dtos/category/category.dto";
import { validateBody } from "../middlewares/validate.middleware";

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
  @Middlewares(validateBody(CategoryDTO))
  public async createCategory(@Body() category: CategoryDTO): Promise<void> {
    await this.categoryService.createCategory(category.name);
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
  @Middlewares(validateBody(CategoryDTO))
  public async updateCategory(@Body() category: CategoryDTO): Promise<void> {
    await this.categoryService.updateCategory(category);
  }

  @Delete("")
  @Security("sessionAuth", ["isAdmin"])
  public async deleteCategory(@Query() id: string): Promise<void> {
    await this.categoryService.removeCategory(id);
  }
}
