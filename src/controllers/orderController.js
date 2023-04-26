const Order = require("../models/Order");
const product = require("../models/Product");

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
      totalPrice,
    } = req.body;

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
      postalCode,
      address,
      detailAddress,
      userPhone,
      orderRequest,
      orderList,
      deliveryFee,
      userEmail: req.session.email,
      totalPrice,
    });

    await order.save();

    res.status(201).json({ message: "주문이 생성되었습니다.", order });
  } catch (error) {
    next(error);
  }
};

// 주문 조회
exports.getUserOrders = async (req, res, next) => {
  try {
    const userEmail = req.params.userEmail;

    const orders = await Order.find({ email: userEmail }).populate(
      "orderList.product"
    );

    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

// 주문 정보 리스트 불러오기
exports.getOrderList = async (req, res) => {
  try {
    const orders = await Order.find({ email: userEmail }).populate(
      "orderList.product"
    );

    const orderList = orders.map(order => {
      return {
        orderId: order.orderId,
        email: order.email,
        shippingStatus: order.shippingStatus,
        deliveryFee: order.deliverytFee,
        userName: order.userName,
        postalCode: order.postalCode,
        address: order.address,
        detailAddress: order.detailAddress,
        userPhone: order.userPhone,
        orderRequest: order.orderRequest,
        itemList: order.orderList.map(item => {
          const Product = item.product;
          return {
            title: product.title,
            author: product.author,
            publisher: product.publisher,
            publication_date: product.publication_date,
            isbn: product.isbn,
            description: product.description,
            price: product.price,
            image_path: product.image_path,
            category: product.category,
            amount: item.amount,
          };
        }),
        totalPrice: order.totalPrice,
      };
    });

    res.status(200).json({ orderList });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
