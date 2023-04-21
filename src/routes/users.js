const express = require("express");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const hashPassword = require("../middlewares/hashPassword");

router.get("/", function (req, res, next) {
  res.render("register/register.html");
});

//추가적으로 묶을 필요가 있음 라우터부분
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("이름을 입력해주세요."),
    body("password")
      .notEmpty()
      .withMessage("비밀번호를 입력해주세요.")
      .isLength({ min: 8 })
      .withMessage("비밀번호는 최소 8자 이상이어야 합니다.")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("비밀번호는 특수문자를 최소 1개 이상 포함해야 합니다."),
    body("address").trim().notEmpty().withMessage("주소를 입력해주세요."),
    body("phone")
      .notEmpty()
      .withMessage("전화번호를 입력해주세요.")
      .matches(/^\d{3}-\d{3,4}-\d{4}$/)
      .withMessage("전화번호 형식이 올바르지 않습니다."),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("이메일을 입력해주세요.")
      .isEmail()
      .withMessage("유효한 이메일 주소가 아닙니다.")
      .custom(async (value, { req }) => {
        // 이메일 중복 검사
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("이미 사용 중인 이메일 주소입니다.");
        }
        return true;
      }),
    body("postalCode")
      .trim()
      .notEmpty()
      .withMessage("우편번호를 입력해주세요."),
    body("detailAddress")
      .trim()
      .notEmpty()
      .withMessage("상세주소를 입력해주세요."),
  ], // hashPassword 미들웨어 추가
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const password = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name: req.body.name,
        password: password,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        postalCode: req.body.postalCode,
        detailAddress: req.body.detailAddress,
        isAdmin: false,
      });

      await newUser.save();

      res.status(201).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
module.exports = router;
