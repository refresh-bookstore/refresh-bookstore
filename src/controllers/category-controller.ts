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
import { CategoryService } from "../services/categoryService";
import { CreateUpdateCategoryDto } from "../dtos/create-update-category.dto";

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
    @Body() body: CreateUpdateCategoryDto
  ): Promise<any> {
    try {
      const result = await this.categoryService.createCategory(body.name);
      return { message: "카테고리 생성이 완료되었습니다.", data: result };
    } catch (error) {
      this.setStatus(error.status || 500);
      return { message: error.message || "서버 오류가 발생했습니다." };
    }
  }

  @Get("category")
  public async getCategoryList(): Promise<any> {
    try {
      const result = await this.categoryService.getCategories();
      return { message: "카테고리를 조회하였습니다.", data: result };
    } catch (error) {
      this.setStatus(error.status || 500);
      return { message: error.message || "서버 오류가 발생했습니다." };
    }
  }

  @Get("category/{id}")
  public async getCategoryById(@Path() id: string): Promise<any> {
    try {
      const result = await this.categoryService.getCategory(id);
      return { message: "카테고리를 조회합니다.", data: result };
    } catch (error) {
      this.setStatus(error.status || 500);
      return { message: error.message || "서버 오류가 발생했습니다." };
    }
  }

  @Get("user-admin/categories")
  @Security("sessionAuth", ["isAdmin"])
  public async getAdminCategoryList(): Promise<any> {
    try {
      console.log("getAdminCategoryList: Method called");

      const result = await this.categoryService.getCategories();
      console.log("getAdminCategoryList: Categories retrieved", result);

      return { message: "카테고리 목록을 조회하였습니다.", data: result };
    } catch (error) {
      console.error("getAdminCategoryList: Error", error);
      this.setStatus(error.status || 500);
      return { message: error.message || "서버 오류가 발생했습니다." };
    }
  }

  @Get("user-admin/category")
  @Security("sessionAuth", ["isAdmin"])
  public async getAdminCategoryQueryById(@Query() id: string): Promise<any> {
    try {
      const result = await this.categoryService.getCategory(id);
      return { message: "카테고리를 조회합니다.", data: result };
    } catch (error) {
      this.setStatus(error.status || 500);
      return { message: error.message || "서버 오류가 발생했습니다." };
    }
  }

  @Put("user-admin/category")
  @Security("sessionAuth", ["isAdmin"])
  public async updateCategory(
    @Query() id: string,
    @Body() body: CreateUpdateCategoryDto
  ): Promise<any> {
    try {
      const result = await this.categoryService.updateCategory(id, body.name);
      return { message: "카테고리를 수정하였습니다.", data: result };
    } catch (error) {
      this.setStatus(error.status || 500);
      return { message: error.message || "서버 오류가 발생했습니다." };
    }
  }

  @Delete("user-admin/category")
  @Security("sessionAuth", ["isAdmin"])
  public async deleteCategory(@Query() id: string): Promise<any> {
    try {
      const result = await this.categoryService.removeCategory(id);
      return { message: "카테고리를 삭제했습니다.", data: result };
    } catch (error) {
      this.setStatus(error.status || 500);
      return { message: error.message || "서버 오류가 발생했습니다." };
    }
  }
}
