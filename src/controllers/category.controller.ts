import {
  Controller,
  Route,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Path,
  Security,
  Tags,
  Middlewares,
  Response,
} from "tsoa";
import { CategoryService } from "../services/category.service";
import { CategoryResponse } from "../dtos/category/category.response";
import { validateBody } from "../middlewares/validate.middleware";
import { Error } from "../exceptions/exception.type";
import { CategoryDTO } from "../dtos/category/category.dto";

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
  @Response<Error>("409", "이미 존재하는 카테고리입니다.")
  @Response<Error>("500", "카테고리 생성 중 오류가 발생했습니다.")
  @Middlewares(validateBody(CategoryDTO))
  public async createCategory(@Body() category: CategoryDTO): Promise<void> {
    await this.categoryService.createCategory(category.name);
  }

  @Get("")
  public async getCategoryList(): Promise<CategoryResponse[]> {
    return await this.categoryService.getCategories();
  }

  @Put("")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 카테고리를 찾을 수 없습니다.")
  @Response<Error>("500", "카테고리 업데이트 중 오류가 발생했습니다.")
  @Middlewares(validateBody(CategoryDTO))
  public async updateCategory(@Body() category: CategoryDTO): Promise<void> {
    await this.categoryService.updateCategory(category);
  }

  @Delete("{id}")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 카테고리를 찾을 수 없습니다.")
  @Response<Error>("500", "카테고리 삭제 중 오류가 발생했습니다.")
  public async deleteCategory(@Path() id: string): Promise<void> {
    await this.categoryService.removeCategory(id);
  }
}
