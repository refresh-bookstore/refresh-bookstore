const Order = require("../models/Order");

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

// 배송지 변경
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
