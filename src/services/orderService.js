const Order = require("../models/order");

// 주문 하기
exports.createOrder = async (req, res, next) => {
  try {
    const { userName, userAddress, userPhone, orderRequest, orderList } =
      req.body;

    // 주문 상품 목록이 없을 경우 에러 발생
    if (!orderList || orderList.length === 0) {
      throw new Error("주문 상품 목록이 없습니다.");
    }

    // 주문 상품 목록에서 상품 수량이 0 이하일 경우 에러 발생
    for (let i = 0; i < orderList.length; i++) {
      if (orderList[i].quantity <= 0) {
        throw new Error("상품 수량은 1개 이상이어야 합니다.");
      }
    }

    const order = new Order({
      userName,
      userAddress,
      userPhone,
      orderRequest,
      orderList,
      totalPrice: 0, // 일단 0으로 초기화
    });

    await order.save();

    res.status(201).json({ message: "주문이 생성되었습니다.", order });
  } catch (error) {
    next(error);
  }
};

// 주문 조회
exports.getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ orderId }).populate(
      "orderList.product"
    );

    if (!order) {
      return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    }

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

// 주문 취소
exports.cancelOrder = async orderId => {
  try {
    const order = await Order.findOne({ orderId });

    if (
      order.shippingStatus === "배송 완료" ||
      order.shippingStatus === "주문 취소"
    ) {
      throw new Error("이미 배송 완료된 상품이거나 취소된 주문입니다.");
    }

    order.shippingStatus = "주문 취소";
    await order.save();

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

exports.changeShippingAddress = async (req, res) => {
  try {
    const { postalCode, address, detailAddress } = req.body;
    const email = req.session.email; // 세션에서 이메일 값을 가져옴

    const order = await Order.findOneAndUpdate(
      { email },
      { $set: { postalCode, address, detailAddress } },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }

    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
};

//  주문 상태 변경
exports.updateShippingStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await orderService.updateShippingStatus(
      orderId,
      status
    );

    res.status(200).json({
      success: true,
      message: "주문 배송 상태가 성공적으로 업데이트되었습니다.",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
