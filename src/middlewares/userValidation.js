const { body, check, validationResult } = require("express-validator");
const User = require("../models/User");

exports.validateUserRegistration = [
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
        // throw new Error("이미 사용 중인 이메일 주소입니다.");
        return false;
      }
      return true;
    }),
  body("postalCode")
    .trim()
    .isLength({ min: 5, max: 5 })
    .notEmpty()
    .withMessage("우편번호를 입력해주세요."),
  // body("detailAddress")
  //   .trim()
  //   .notEmpty()
  //   .withMessage("상세주소를 입력해주세요."),
];

exports.updateUserValidator = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("새로운 비밀번호 혹은 기존 비밀번호를 입력하세요."),
  check("postalCode")
    .isLength({ min: 5, max: 5 })
    .withMessage("우편번호는 5자리로 입력해주세요."),
  check("address").isLength({ min: 1 }).withMessage("주소를 입력해주세요."),
  // check("detailAddress")
  //   .isLength({ min: 1 })
  //   .withMessage("상세 주소를 입력해주세요."),
  check("phone")
    .matches(/^\d{3}-\d{3,4}-\d{4}$/)
    .withMessage("전화번호 형식이 올바르지 않습니다."),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    throw new Error("Validation error occurred");
  }
  return errors;
};
