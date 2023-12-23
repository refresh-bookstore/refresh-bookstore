import { Order } from "@prisma/client";
import { OrderList } from "./order.list";
import { translateShippingStatus } from "../../utils/translate.shipping.status";

export class OrderResponse {
  orderId: string;
  recipientName: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  contact: string;
  deliveryRequest: string;
  shippingStatus: string;
  deliveryFee: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  orderList: OrderList[];

  constructor(order: Order, orderList: OrderList[]) {
    this.orderId = order.orderId;
    this.recipientName = order.recipientName;
    this.postalCode = order.postalCode;
    this.address = order.address;
    this.addressDetail = order.addressDetail;
    this.contact = order.contact;
    this.deliveryRequest = order.deliveryRequest;
    this.shippingStatus = translateShippingStatus(order.shippingStatus);
    this.deliveryFee = order.deliveryFee;
    this.totalPrice = order.totalPrice;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    this.orderList = orderList;
  }
}
