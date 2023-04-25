const express = require("express");
const router = express.Router();
const { updateUserValidator } = require("../middlewares/userValidation");
const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/userController");
const checkSession = require("../middlewares/checkSession");

router.get("/register", (req, res) => {
  res.render("register/register.html");
});

router.get("/login", checkSession, (req, res) => {
  if (req.user) {
    res.send(`<script>alert("이미 로그인 된 상태입니다.");</script>`);
  } else {
    res.render("login/login.html");
  }
});

router.get("/user-mypage", checkSession, getUserInfo, (req, res) => {
  res.render("user-mypage/user-mypage.html");
});

router.get("/order-create", getUserInfo, (req, res) => {
  res.render("order-create/order-create.html");
});

router.get(
  "/user-mypage/order-detail",
  checkSession,
  /*getOrderInfo*/ (req, res) => {
    res.render("user-mypage/order-detail.html");
  }
);

router.get("/book-detail", (req, res) => {
  res.render("book-detail/book-detail.html");
});

router.get("/cart", (req, res) => {
  res.render("cart/cart.html");
});

module.exports = router;
