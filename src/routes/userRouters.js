const express = require("express");
const router = express.Router();
const { validateUserRegistration } = require("../middlewares/userValidation");
const { login, logout } = require("../controllers/loginController");
const checkSession = require("../middlewares/checkSession");
const { createUser, updateUserInfo } = require("../controllers/userController");
const { deleteUserByEmail } = require("../services/userService");
const { isAdmin } = require("../middlewares/isAdmin.js");

//회원가입
router.post("/register", validateUserRegistration, createUser);
//로그인
router.post("/login", login);
//로그아웃
router.post("/logout", checkSession, logout);
//사용자 정보 업데이트
router.post("/users/:id", checkSession, updateUserInfo);
//사용자 정보 삭제
router.delete("/users/:id", checkSession, deleteUserByEmail);

module.exports = router;
