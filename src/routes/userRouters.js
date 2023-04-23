const express = require("express");
const router = express.Router();
const {
  validateUserRegistration,
  updateUserValidator,
} = require("../middlewares/userValidation");
const loginController = require("../controllers/loginController");
const checkSession = require("../middlewares/checkSession");
const { createUser, updateUserInfo } = require("../controllers/userController");

// 회원가입 페이지 보여주기
router.get("/register", (req, res) => {
  res.render("register/register.html");
});

// 로그인 페이지 보여주기
router.get("/login", (req, res) => {
  res.render("login/login.html");
});

// 회원가입 처리하기
router.post("/register", validateUserRegistration, createUser);

// 로그인 처리하기
router.post("/login", checkSession, loginController.login);

module.exports = router;
