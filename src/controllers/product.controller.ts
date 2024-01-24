import {
  Body,
  Controller,
  Middlewares,
  Post,
  Route,
  Security,
  Tags,
  Response,
  Get,
  Path,
  Delete,
  Query,
  Patch,
} from "tsoa";
import { ProductResponse } from "../dtos/product/product.response";
import { ProductDTO } from "../dtos/product/product.dto";
import { validateBody } from "../middlewares/validate.middleware";
import { ProductService } from "../services/product.service";
import { UpdateProduct } from "../dtos/product/update.product";
import { BookStorageService } from "../services/book.storage.service";
import { GetProductsResult } from "../dtos/product/get.products.result";

@Tags("Product")
@Route("")
export class ProductController extends Controller {
  private productService: ProductService;
  private bookStorageService: BookStorageService;

  constructor() {
    super();
    this.productService = new ProductService();
    this.bookStorageService = new BookStorageService();
  }

  /**
   * 제품을 생성합니다.
   * 이 메소드는 오버헤드를 줄이기 위해 성공 시 '204 No Content' 상태 코드를 반환합니다.
   * '204 No Content'는 요청이 성공적으로 처리되었으나 클라이언트에 전송할 추가 콘텐츠가 없음을 나타냅니다.
   *
   * @param productDTO 생성할 제품에 대한 데이터를 담은 DTO
   * @throws {Error} 409 이미 존재하는 카테고리일 경우
   * @throws {Error} 500 서버 오류로 카테고리 생성에 실패한 경우
   */
  @Post("product")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("409", "이미 존재하는 상품입니다.")
  @Response<Error>("500", "상품 등록 중 오류가 발생했습니다.")
  @Middlewares(validateBody(ProductDTO))
  public async createProduct(@Body() productDTO: ProductDTO): Promise<void> {
    await this.productService.createProduct(productDTO);
  }

  @Patch("product/{isbn}")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 상품이 존재하지 않습니다.")
  @Response<Error>("500", "상품 등록 중 오류가 발생했습니다.")
  @Middlewares(validateBody(UpdateProduct))
  public async updateProduct(
    @Path() isbn: string,
    @Body() updateData: UpdateProduct
  ): Promise<void> {
    await this.productService.updateProduct(isbn, updateData);
  }

  @Get("product")
  public async getProductList(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Query() searchTerm?: string,
    @Query() isbn?: string
  ): Promise<GetProductsResult> {
    limit = Math.min(limit, 100);

    const { data: products, total } = await this.productService.getProducts({
      page,
      limit,
      searchTerm,
      isbn,
    });

    return {
      data: products,
      total,
      page,
      limit,
    };
  }

  @Get("product/search")
  public async searchProduct(
    @Query() keyword: string
  ): Promise<ProductResponse[]> {
    return await this.productService.searchProducts(keyword);
  }

  @Get("product/{isbn}")
  @Response<Error>("404", "해당 상품이 존재하지 않습니다.")
  public async getProduct(@Path() isbn: string): Promise<ProductResponse> {
    return await this.productService.getProduct(isbn);
  }

  @Get("products/{categoryId}")
  public async getProductsByCategory(
    @Path() categoryId: string
  ): Promise<ProductResponse[]> {
    return await this.productService.getProductsByCategory(categoryId);
  }

  @Delete("product/{isbn}")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 상품이 존재하지 않습니다.")
  @Response<Error>("500", "상품 삭제 중 오류가 발생했습니다.")
  public async deleteProduct(@Path() isbn: string): Promise<void> {
    return await this.productService.deleteProduct(isbn);
  }

  @Post("/fetch-aladin")
  @Security("sessionAuth", ["isAdmin"])
  public async fetchAndStoreAladinData(): Promise<void> {
    try {
      await this.bookStorageService.fetchDataAndStore();
    } catch (error) {
      throw new Error(`데이터 가져오기 및 저장 중 오류 발생: ${error.message}`);
    }
  }
}
