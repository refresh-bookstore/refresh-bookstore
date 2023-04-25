const { Router } = require("express");
const checkSession = require("../middlewares/checkSession");
const { createOrder, getOrderList } = require("../controllers/orderController");
const router = Router();

//주문 목록을 기쟈오기 위한 API
router.get("/orders", checkSession, getOrderList);
//주문 생성을 하는 API
router.post("/orders", checkSession, createOrder);

module.exports = router;
