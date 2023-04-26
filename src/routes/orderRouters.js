const { Router } = require("express");
const checkSession = require("../middlewares/checkSession");
const { createOrder, getOrderList, getOrderId } = require("../controllers/orderController");
const { changeShippingAddress, updateShippingStatus, cancelOrder, deleteOrder} = require("../services/orderService");
const router = Router();

//주문 목록을 기쟈오기 위한 API
router.get("/orders", checkSession, getOrderList);

//주문 생성을 하는 API
router.post("/orders", checkSession, createOrder);

//주문 ID로 데이터 불러오기 API
router.get("/orders/:orderId", checkSession, getOrderId);

//사용자는 주문 정보를 변경할 수 있습니다.
router.put("/order/:orderId", checkSession, changeShippingAddress);

//사용자는 주문 정보를 변경할 수 있습니다.
router.put("/orders/:orderId", checkSession, cancelOrder);

// Admin :: 주문 수정하기
router.put("/order/admin/:orderId", checkSession, isAdmin, updateShippingStatus);

// Admin :: 주문 삭제하기
router.delete("/order/admin/:orderId", checkSession, isAdmin, deleteOrder);

module.exports = router;
