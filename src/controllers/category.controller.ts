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
  Response,
} from "tsoa";
import { CategoryService } from "../services/category.service";
import { CategoryDTO } from "../dtos/category/category.dto";
import { validateBody } from "../middlewares/validate.middleware";
import { Error } from "../exceptions/exception.type";

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
  public async getCategoryList(): Promise<CategoryDTO[]> {
    return await this.categoryService.getCategories();
  }

  @Get("{id}")
  @Response<Error>("404", "해당 카테고리를 찾을 수 없습니다.")
  @Response<Error>("500", "카테고리를 불러오는 중에 오류가 발생했습니다.")
  public async getCategoryById(@Path() id: string): Promise<CategoryDTO> {
    return await this.categoryService.getCategory(id);
  }

  @Put("")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 카테고리를 찾을 수 없습니다.")
  @Response<Error>("500", "카테고리 업데이트 중 오류가 발생했습니다.")
  @Middlewares(validateBody(CategoryDTO))
  public async updateCategory(@Body() category: CategoryDTO): Promise<void> {
    await this.categoryService.updateCategory(category);
  }

  @Delete("")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 카테고리를 찾을 수 없습니다.")
  @Response<Error>("500", "카테고리 삭제 중 오류가 발생했습니다.")
  public async deleteCategory(@Query() id: string): Promise<void> {
    await this.categoryService.removeCategory(id);
  }
}
