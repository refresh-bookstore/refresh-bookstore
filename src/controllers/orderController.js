const Order = require("../models/Order");

const orderController = {
  async createOrder(req, res) {
    const { shippingStatus, orderList } = req.body;
    const { name, address, phone } = req.session.user;

    const orderRandom = Math.floor(Math.random() * 10000000000) + 10000000000;
    const data = new Order({
      orderId: orderRandom,
      shippingStatus,
      orderList,
      userName: name,
      userAddress: address,
      userPhone: phone,
    });

    console.log(data);

    try {
      const result = await Order.create(data);
      res.status(200).json({
        message: "Upload success!",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "생성 오류입니다.",
      });
    }
  },

  async getOrderList(req, res) {
    try {
      const result = await Order.find({});
      res.render("orderdummy.html");
      // res.status(200).json({
      //   message: "Read success!",
      //   data: result,
      // });
    } catch (error) {
      res.status(500).json({
        message: "데이터를 조회할 수 없습니다.",
      });
    }
  },
};

module.exports = orderController;
