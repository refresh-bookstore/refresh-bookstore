const Order = require("../models/Order");

async function createOrder(orderData) {
  try {
    const orderRandom = Math.floor(Math.random() * 10000000000) + 10000000000;

    const newOrder = new Order({
      orderId: orderRandom,
      shippingStatus: orderData,
      orderList: orderDate.orderList,
      userName: orderData.userName,
      userAddress: orderData.userAddress,
      userPhone: orderData.userPhone,
      orderRequest: orderData.orderRequest,
    });

    const result = await newOrder.save();
    return result;
  } catch (error) {
    throw new Error("주문을 생성할 수 없습니다!");
  }
}

async function getOrderList() {
  try {
    const result = await Order.find({}).populate("orderList.product");
    return result;
  } catch (error) {
    throw new Error("데이터를 조회할 수 없습니다");
  }
}

module.exports = {
  createOrder,
  getOrderList,
};
