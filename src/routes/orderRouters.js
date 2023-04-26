const { Router } = require("express");
const checkSession = require("../middlewares/checkSession");
const { createOrder, getOrderList } = require("../controllers/orderController");
const { changeShippingAddress } = require("../services/orderService");
const router = Router();

//주문 목록을 기쟈오기 위한 API
router.get("/orders", checkSession, getOrderList);
//주문 생성을 하는 API
router.post("/orders", checkSession, createOrder);
//사용자는 주문 정보를 변경할 수 있습니다.
router.post("/user-mypage/order-detail", checkSession, changeShippingAddress);

module.exports = router;
