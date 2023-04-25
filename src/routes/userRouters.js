const express = require("express");
const router = express.Router();
const { validateUserRegistration } = require("../middlewares/userValidation");
const { login, logout } = require("../controllers/loginController");
const checkSession = require("../middlewares/checkSession");
const { createUser, updateUserInfo } = require("../controllers/userController");
const { deleteUserByEmail } = require("../services/userService");
const { isAdmin } = require("../middlewares/isAdmin.js");

router.post("/register", validateUserRegistration, createUser);
router.post("/login", login);
router.post("/logout", checkSession, logout);
router.post("user-mypage/update", checkSession, updateUserInfo);
router.delete("user-mypage/delete", checkSession, deleteUserByEmail);

module.exports = router;
