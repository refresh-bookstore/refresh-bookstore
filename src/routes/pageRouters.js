const express = require("express");
const router = express.Router();
const { updateUserValidator } = require("../middlewares/userValidation");
const {
  getUserInfo,
  updateUserInfo,
} = require("../controllers/userController");

// 사용자 정보 페이지
router.get("/user-mypage", getUserInfo, (req, res) => {
  res.json(req.user);
});

// 사용자 정보 업데이트
router.post("/use-mypage/update", updateUserValidator, updateUserInfo);

router.get("/order-create", getUserInfo, (req, res) => {
  res.render("order-create");
});

module.exports = router;
