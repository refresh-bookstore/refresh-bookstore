const express = require("express");
const router = express.Router();
const { validateUserRegistration } = require("../middlewares/userValidation");
const loginController = require("../controllers/loginController");
const checkSession = require("../middlewares/checkSession");
const {
  createUser,
  getUsers,
  updateUsers,
} = require("../controllers/userController");
const { isAdmin } = require("../middlewares/isAdmin.js");

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

// 관리자 페이지에서, 회원 관리, 회원 수정
router.get("/user-admin", checkSession, getUsers, (req, res) => {
  res.json(req);
});

router.put("/", checkSession, isAdmin, updateUsers);

module.exports = router;
