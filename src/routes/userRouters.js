const express = require("express");
const router = express.Router();
const {
  validateUserRegistration,
  updateUserValidator,
} = require("../middlewares/userValidation");
const { login, logout } = require("../controllers/loginController");
const checkSession = require("../middlewares/checkSession");
const {
  getUserInfo,
  createUser,
  updateUserInfo,
  getUsers,
} = require("../controllers/userController");
const { deleteUserByEmail } = require("../services/userService");
const { isAdmin } = require("../middlewares/isAdmin.js");

//회원가입
router.post("/register", validateUserRegistration, createUser);
//로그인
router.post("/login", login);
//로그아웃
router.post("/logout", checkSession, logout);
//사용자 정보 조회
router.get("/userinfo", checkSession, getUserInfo);
//사용자 정보 업데이트
router.post("/update", checkSession, updateUserValidator, updateUserInfo);
//사용자 정보 삭제
router.delete("/delete", checkSession, deleteUserByEmail);
//회원 정보들 불러오기
router.get("/users", checkSession, isAdmin, getUsers);

module.exports = router;
