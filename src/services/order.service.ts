import { UpdateOrder } from "./../dtos/order/update.order";
import { CreateOrder } from "./../dtos/order/create.order";
import { OrderRepository } from "../repositories/order.repository";
import { UserService } from "./user.service";
import { OrderResponse } from "../dtos/order/order.response";
import {
  InternalServerErrorException,
  NotFoundException,
} from "../exceptions/http.exception";

export class OrderService {
  private orderRepository: OrderRepository;
  private userService: UserService;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.userService = new UserService();
  }

  async createOrder(email: string, createOrder: CreateOrder): Promise<void> {
    const user = await this.userService.getUserOrThrow(email);
    const newOrder = await this.orderRepository.create(user.id, createOrder);

    if (newOrder === null) {
      throw new InternalServerErrorException(
        "재고가 부족하거나, 현재 주문을 처리할 수 없습니다. 다시 시도해주세요.",
      );
    }
  }

  async updateOrder(
    orderId: string,
    email: string,
    updateOrder: UpdateOrder,
    isAdmin: boolean,
  ): Promise<void> {
    let userId;

    if (!isAdmin) {
      const user = await this.userService.getUserOrThrow(email);
      userId = user.id;
    }

    const updateData = await this.orderRepository.update(
      orderId,
      userId,
      updateOrder,
    );

    if (updateData === null) {
      throw new InternalServerErrorException(
        "주문 수정 중 오류가 발생했습니다.",
      );
    }
  }

  async getOrder(email: string, orderId: string): Promise<OrderResponse> {
    const user = await this.userService.getUserOrThrow(email);
    const order = await this.orderRepository.getOrder(user.id, orderId);

    if (order === null) {
      throw new NotFoundException(`해당 주문은 존재하지 않습니다.`);
    }
    return order;
  }

  async getOrdersbyUser(email: string): Promise<OrderResponse[]> {
    const user = await this.userService.getUserOrThrow(email);
    return await this.orderRepository.findOrdersByUser(user.id);
  }

  async getOrders(): Promise<OrderResponse[]> {
    return await this.orderRepository.findAll();
  }

  async deleteOrder(id: string): Promise<void> {
    const deleted = await this.orderRepository.delete(id);
    if (deleted === null) {
      throw new InternalServerErrorException(
        "주문 취소 상태가 아니거나, 삭제처리 할 수 없습니다.",
      );
    }
  }
}
