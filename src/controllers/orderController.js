const Order = require("../models/Order");
const Product = require("../models/Product");


// 주문 하기
exports.createOrder = async (req, res, next) => {
  try {
    const {
      userName,
      postalCode,
      address,
      detailAddress,
      userPhone,
      orderRequest,
      orderList,
      deliveryFee,
      email,
      totalPrice,
    } = req.body;

    // 주문 상품 목록이 없을 경우 에러 발생
    if (!orderList || orderList.length === 0) {
      throw new Error("주문 상품 목록이 없습니다.");
    }

    let orderArr = [];
    // 주문 상품 목록에서 상품 수량이 0 이하일 경우 에러 발생
    for (let i = 0; i < orderList.length; i++) {
      if (orderList[i].amount <= 0) {
        throw new Error("상품 수량은 1개 이상이어야 합니다.");
      }
      // isbn으로 상품 찾아서 _id 전달
      const product = await Product.findOne({ isbn: orderList[i].product });
      orderArr.push({ product: product._id, amount: orderList[i].amount });
    }

    
    const order = new Order({
      userName,
      postalCode,
      address,
      detailAddress,
      userPhone,
      orderRequest,
      orderList: orderArr,
      deliveryFee,
      email, 
      totalPrice,
    });

    await order.save();

    res.status(201).json({ message: "주문이 생성되었습니다.", order });
  } catch (error) {
    next(error);
  }
};

// 주문 전체 조회
exports.getOrderList = async (req, res, next) => {
  try {
    const order = await Order.find({});
    console.log(order);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrderId = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    console.log(orderId);

    const order = await Order.find({orderId : orderId});
    console.log(order);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
