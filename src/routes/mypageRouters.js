const express = require("express");
const router = express.Router();
const { updateUserValidator } = require("../middlewares/userValidation");
const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/userController");

router.get("/user-mypage", getUserInfo);
router.post("/use-mypage/update", updateUserValidator, updateUserInfo);

module.exports = router;
