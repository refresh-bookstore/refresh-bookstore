import { CreateOrder } from "./../dtos/order/create.order";
import { PrismaClient, Order, ShippingStatus } from "@prisma/client";
import { ProductRepository } from "./product.repository";
import { OrderIdGenerator } from "../utils/order.id.generator";
import { UpdateProduct } from "../dtos/product/update.product";
import { OrderResponse } from "../dtos/order/order.response";
import { OrderList } from "../dtos/order/order.list";
import { UpdateOrder } from "../dtos/order/update.order";

const prisma = new PrismaClient();

interface OrderContext {
  order: {
    findUnique: PrismaClient["order"]["findUnique"];
  };
}

export class OrderRepository {
  private context: OrderContext;
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.context = { order: prisma.order };
  }

  async create(
    userId: number,
    createOrder: CreateOrder
  ): Promise<Order | null> {
    return await prisma.$transaction(async (transaction) => {
      let uniqueOrderId: string;

      do {
        uniqueOrderId = OrderIdGenerator.generateOrderId();
      } while (!(await this.isOrderIdUnique(uniqueOrderId)));

      const order = await transaction.order.create({
        data: {
          userId: userId,
          orderId: uniqueOrderId,
          recipientName: createOrder.recipientName,
          postalCode: createOrder.postalCode,
          address: createOrder.address,
          addressDetail: createOrder.addressDetail,
          deliveryRequest: createOrder.deliveryRequest,
          contact: createOrder.contact,
          deliveryFee: createOrder.deliveryFee,
          totalPrice: createOrder.totalPrice,
        },
      });

      for (const item of createOrder.orderItems) {
        const product = await this.productRepository.getProduct(item.ISBN);
        if (!product || product.stock < item.amount) {
          return null;
        }

        await transaction.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            amount: item.amount,
          },
        });

        const updatedStock = new UpdateProduct();
        updatedStock.stock = product.stock - item.amount;
        await this.productRepository.update(product.isbn, updatedStock);
      }

      return order;
    });
  }

  async update(
    orderId: string,
    userId: number | undefined,
    updateOrder: UpdateOrder
  ): Promise<Order | null> {
    return await prisma.$transaction(async (transaction) => {
      const existingOrder = await transaction.order.findUnique({
        where: { orderId: orderId },
        include: { orderItems: { include: { product: true } } },
      });

      if (
        !existingOrder ||
        (userId !== undefined && existingOrder.userId !== userId)
      ) {
        return null;
      }

      if (existingOrder.shippingStatus === ShippingStatus.CANCELLED) {
        return null;
      }

      const shouldRevertStock =
        (existingOrder.shippingStatus === ShippingStatus.READY ||
          existingOrder.shippingStatus === ShippingStatus.SHIPPING) &&
        updateOrder.shippingStatus === ShippingStatus.CANCELLED;

      const updateData: Partial<UpdateOrder> = {};
      Object.keys(updateOrder).forEach((key) => {
        if (updateOrder[key] !== undefined) {
          updateData[key] = updateOrder[key];
        }
      });

      if (shouldRevertStock) {
        for (const item of existingOrder.orderItems) {
          const product = await transaction.product.findUnique({
            where: { id: item.productId },
          });

          if (!product) {
            continue;
          }

          const updatedStock = new UpdateProduct();
          updatedStock.stock = product.stock + item.amount;
          await this.productRepository.update(product.isbn, updatedStock);
        }
      }

      const updatedOrder = await transaction.order.update({
        where: { id: existingOrder.id },
        data: updateData,
      });

      return updatedOrder;
    });
  }

  async getOrder(
    userId: number,
    orderId: string
  ): Promise<OrderResponse | null> {
    const order = await prisma.order.findUnique({
      where: {
        orderId: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order || order.userId !== userId) {
      return null;
    }

    const orderLists = order.orderItems.map(
      (item) => new OrderList(item.product, item.amount)
    );
    return new OrderResponse(order, orderLists);
  }

  async findOrdersByUser(userId: number): Promise<OrderResponse[]> {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) => {
      const orderLists = order.orderItems.map(
        (item) => new OrderList(item.product, item.amount)
      );

      return new OrderResponse(order, orderLists);
    });
  }

  async findAll(): Promise<OrderResponse[]> {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders.map((order) => {
      const orderLists = order.orderItems.map(
        (item) => new OrderList(item.product, item.amount)
      );

      return new OrderResponse(order, orderLists);
    });
  }

  async delete(orderId: string): Promise<Order | null> {
    const existingOrder = await prisma.order.findUnique({
      where: { orderId },
    });

    if (
      !existingOrder ||
      existingOrder.shippingStatus !== ShippingStatus.CANCELLED
    ) {
      return null;
    }

    return await prisma.order.delete({
      where: { orderId },
    });
  }

  private async isOrderIdUnique(
    orderId: string,
    context: OrderContext = this.context
  ): Promise<boolean> {
    const order = await context.order.findUnique({
      where: { orderId },
    });
    return !order;
  }
}
