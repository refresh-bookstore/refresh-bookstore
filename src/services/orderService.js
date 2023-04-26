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

exports.cancelOrder = async (req, res) => {
  try {
    const { shippingStatus } = req.body;
    const orderId = req.params.orderId;

    const findOrderId = await Order.findOne({ orderId });

    if(findOrderId.shippingStatus === "배송 완료" || findOrderId.shippingStatus === "주문 취소"){
      throw new Error("이미 배송 완료된 상품이거나 취소된 주문입니다.");
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { shippingStatus},
      { new: true }
    );

    if (!orderId) {
      return res.status(404).send({ error: "Order not found" });
    }

    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
};

// Admin :: 주문 삭제하기
exports.deleteOrder = async (req, res) => {
  try {

    const orderId = req.params.orderId;
    const order = await Order.deleteOne({ orderId: orderId});

    if (!orderId) {
      return res.status(404).send({ error: "Order not found" });
    }

    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
};


// 사용자 전용 :: 주문정보 변경
exports.changeShippingAddress = async (req, res) => {
  try {
    const { postalCode, address, detailAddress } = req.body;
    const orderId = req.params.orderId;

    console.log(orderId);

    const order = await Order.findOneAndUpdate(
      { orderId },
      { postalCode,
        address, 
        detailAddress},
      { new: true }
    );

    if (!orderId) {
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
    const { shippingStatus } = req.body;
    const orderId = req.params.orderId;
    console.log(orderId);

    const order = await Order.findOneAndUpdate(
      { orderId },
      { shippingStatus },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "주문 배송 상태가 성공적으로 업데이트되었습니다.",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
