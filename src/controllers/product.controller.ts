import { ProductResponse } from "../dtos/product/product.response";
import { ProductDTO } from "../dtos/product/product.dto";
import { validateBody } from "../middlewares/validate.middleware";
import { ProductService } from "../services/product.service";
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
import { UpdateProduct } from "../dtos/product/update.product";

@Tags("Product")
@Route("product")
export class ProductController extends Controller {
  private productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  @Post("")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("409", "이미 존재하는 상품입니다.")
  @Response<Error>("500", "상품 등록 중 오류가 발생했습니다.")
  @Middlewares(validateBody(ProductDTO))
  public async createProduct(@Body() productDTO: ProductDTO): Promise<void> {
    await this.productService.createProduct(productDTO);
  }

  @Patch("")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 상품이 존재하지 않습니다.")
  @Response<Error>("500", "상품 등록 중 오류가 발생했습니다.")
  @Middlewares(validateBody(UpdateProduct))
  public async updateProduct(@Body() updateData: UpdateProduct): Promise<void> {
    await this.productService.updateProduct(updateData);
  }

  @Get("")
  public async getProductList(): Promise<ProductResponse[]> {
    return await this.productService.getProducts();
  }

  @Get("/search")
  public async searchProduct(
    @Query() keyword: string
  ): Promise<ProductResponse[]> {
    return await this.productService.searchProducts(keyword);
  }

  @Get("{isbn}")
  public async getProduct(@Path() isbn: string): Promise<ProductResponse> {
    return await this.productService.getProduct(isbn);
  }

  @Delete("{isbn}")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("404", "해당 상품이 존재하지 않습니다.")
  @Response<Error>("500", "상품 삭제 중 오류가 발생했습니다.")
  public async deleteProduct(@Path() isbn: string): Promise<void> {
    return await this.productService.deleteProduct(isbn);
  }
}
