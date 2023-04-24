const { Router } = require("express");
const checkSession = require("../middlewares/checkSession");
const orderController = require("../controllers/orderController");
const router = Router();

router.post("/", checkSession, orderController.createOrder);
router.get("/", orderController.getOrderList);

module.exports = router;
