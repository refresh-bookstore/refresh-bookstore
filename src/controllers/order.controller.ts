import {
  Controller,
  Route,
  Post,
  Body,
  Security,
  Tags,
  Request,
  Get,
  Response,
  Path,
  Patch,
  Middlewares,
  Delete,
} from "tsoa";
import { CreateOrder } from "./../dtos/order/create.order";
import { OrderService } from "../services/order.service";
import { Request as RequestExpress } from "../middlewares/express.authentication";
import { OrderResponse } from "../dtos/order/order.response";
import { validateBody } from "../middlewares/validate.middleware";
import { UpdateOrder } from "../dtos/order/update.order";

@Tags("Order")
@Route("")
export class OrderController extends Controller {
  private orderService: OrderService;

  constructor() {
    super();
    this.orderService = new OrderService();
  }

  /**
   * 주문을 생성합니다.
   * 이 메소드는 오버헤드를 줄이기 위해 성공 시 '204 No Content' 상태 코드를 반환합니다.
   * '204 No Content'는 요청이 성공적으로 처리되었으나 클라이언트에 전송할 추가 콘텐츠가 없음을 나타냅니다.
   *
   * @param createOrder 생성할 주문에 대한 데이터를 담은 DTO
   * @throws {Error} 409 이미 존재하는 카테고리일 경우
   * @throws {Error} 500 서버 오류로 카테고리 생성에 실패한 경우
   */
  @Post("order")
  @Security("sessionAuth")
  @Response<Error>("404", "해당 사용자를 찾을 수 없습니다.")
  @Response<Error>(
    "500",
    "재고가 부족하거나, 현재 주문을 처리할 수 없습니다. 다시 시도해주세요."
  )
  @Middlewares(validateBody(CreateOrder))
  public async createOrder(
    @Request() req: RequestExpress,
    @Body() createOrder: CreateOrder
  ): Promise<void> {
    await this.orderService.createOrder(req.session.email, createOrder);
  }

  @Get("order/{id}")
  @Security("sessionAuth")
  @Response<Error>("404", "해당 사용자를 찾을 수 없습니다.")
  @Response<Error>("404", "해당 주문은 존재하지 않습니다.")
  public async getOrder(
    @Path() id: string,
    @Request() req: RequestExpress
  ): Promise<OrderResponse> {
    return this.orderService.getOrder(req.session.email, id);
  }

  @Get("order")
  @Security("sessionAuth")
  @Response<Error>("404", "해당 사용자를 찾을 수 없습니다.")
  public async getOrdersbyUser(
    @Request() req: RequestExpress
  ): Promise<OrderResponse[]> {
    return this.orderService.getOrdersbyUser(req.session.email);
  }

  @Get("orders")
  @Security("sessionAuth", ["isAdmin"])
  public async getOrders(): Promise<OrderResponse[]> {
    return this.orderService.getOrders();
  }

  @Patch("order/{id}")
  @Security("sessionAuth")
  @Response<Error>("404", "해당 사용자를 찾을 수 없습니다.")
  @Response<Error>("500", "주문 수정 중 오류가 발생했습니다.")
  @Middlewares(validateBody(UpdateOrder))
  public async updateOrder(
    @Path() id: string,
    @Request() req: RequestExpress,
    @Body() updateOrder: UpdateOrder
  ): Promise<void> {
    await this.orderService.updateOrder(
      id,
      req.session.email,
      updateOrder,
      false
    );
  }

  @Patch("order/admin/{id}")
  @Security("sessionAuth", ["isAdmin"])
  @Middlewares(validateBody(UpdateOrder))
  public async updateOrderbyAdmin(
    @Path() id: string,
    @Request() req: RequestExpress,
    @Body() updateOrder: UpdateOrder
  ): Promise<void> {
    await this.orderService.updateOrder(
      id,
      req.session.email,
      updateOrder,
      true
    );
  }

  @Delete("order/{id}")
  @Security("sessionAuth", ["isAdmin"])
  @Response<Error>("500", "주문 수정 중 오류가 발생했습니다.")
  public async removeOrders(@Path() id: string): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}
