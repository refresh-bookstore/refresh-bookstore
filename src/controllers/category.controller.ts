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
  SuccessResponse,
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

  /**
   * 새 카테고리를 생성합니다.
   * 이 메소드는 오버헤드를 줄이기 위해 성공 시 '204 No Content' 상태 코드를 반환합니다.
   * '204 No Content'는 요청이 성공적으로 처리되었으나 클라이언트에 전송할 추가 콘텐츠가 없음을 나타냅니다.
   *
   * @param category 생성할 카테고리에 대한 데이터를 담은 DTO
   * @throws {Error} 409 이미 존재하는 카테고리일 경우
   * @throws {Error} 500 서버 오류로 카테고리 생성에 실패한 경우
   */
  @Post()
  @Security("sessionAuth", ["isAdmin"])
  @SuccessResponse("204", "카테고리가 성공적으로 생성되었습니다.")
  @Response<Error>("409", "이미 존재하는 카테고리입니다.")
  @Response<Error>("500", "카테고리 생성 중 오류가 발생했습니다.")
  public async createCategory(@Body() category: CategoryDTO): Promise<void> {
    await this.categoryService.createCategory(category.name);
    this.setStatus(204);
  }

  @Get("")
  public async getCategoryList(): Promise<CategoryResponse[]> {
    return await this.categoryService.getCategories();
  }

  @Put("{id}")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 카테고리를 찾을 수 없습니다.")
  @Response<Error>("500", "카테고리 업데이트 중 오류가 발생했습니다.")
  @Middlewares(validateBody(CategoryDTO))
  public async updateCategory(
    @Path() id: string,
    @Body() category: CategoryDTO
  ): Promise<void> {
    await this.categoryService.updateCategory(id, category);
  }

  @Delete("{id}")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 카테고리를 찾을 수 없습니다.")
  @Response<Error>("500", "카테고리 삭제 중 오류가 발생했습니다.")
  public async deleteCategory(@Path() id: string): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }
}
