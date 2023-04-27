const { Router } = require("express");
const checkSession = require("../middlewares/checkSession");
const {
  createOrder,
  getOrderList,
  getOrderId,
  getOrderEmail,
} = require("../controllers/orderController");
const {
  changeShippingAddress,
  updateShippingStatus,
  cancelOrder,
  deleteOrder,
} = require("../services/orderService");
const { isAdmin } = require("../middlewares/isAdmin.js");
const router = Router();

//주문 목록을 기쟈오기 위한 API
router.get("/orders", checkSession, getOrderList);

//주문 생성을 하는 API
router.post("/orders", checkSession, createOrder);

//주문 ID로 데이터 불러오기 API
router.get("/order-detail/:orderId", checkSession, getOrderId);

//email로 데이터 불러오기 API
router.get("/ordered", checkSession, getOrderEmail);

//사용자는 주문 정보를 변경할 수 있습니다.
router.put("/order-detail/:orderId", checkSession, changeShippingAddress);

//사용자는 주문을 취소할 수 있습니다.(배송상태를 주문취소로 변경)
router.put("/order-detail/:orderId/cancel", checkSession, cancelOrder);

// Admin :: 주문 수정하기
router.put(
  "/order/admin/:orderId",
  checkSession,
  isAdmin,
  updateShippingStatus
);

// Admin :: 주문 삭제하기
router.delete("/order/admin/:orderId", checkSession, isAdmin, deleteOrder);

module.exports = router;
