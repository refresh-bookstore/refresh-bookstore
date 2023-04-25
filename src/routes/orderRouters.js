const { Router } = require("express");
const checkSession = require("../middlewares/checkSession");
const orderController = require("../controllers/orderController");
const router = Router();

router.post("/order-create", checkSession, orderController);

module.exports = router;
