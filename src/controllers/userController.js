const bcrypt = require("bcrypt");
const User = require("../models/User");
const userService = require("../services/userService");
const {
  validateUserRegistration,
  updateUserValidator,
  validate,
} = require("../middlewares/userValidation");

exports.createUser = async (req, res, next) => {
  const errors = validateUserRegistration(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
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
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.session.user.email);
    if (user === null) {
      // 유저가 존재하지 않는 경우
      return res.status(404).send("User not found");
    }
    console.log("사용자 정보 불러오기 성공!");
    res.render("user-mypage", {
      name: user.name,
      email: user.email,
      address: user.address,
      detailAddress: user.detailAddress,
      postalCode: user.postalCode,
      phone: user.phone,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.updateUserInfo = [
  ...updateUserValidator,
  async (req, res, next) => {
    try {
      // 비밀번호 재검증을 위한 로직 / 비활성화
      // const user = await userService.getUserById(req.session.user._id);
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ password: "비밀번호가 일치하지 않습니다." }] });
      // }

      //재활성화시, body안에 password를 가지고 와야함.
      const { password, postalCode, address, detailAddress, phone } = req.body;
      const updatedUser = await userService.updateUserById(
        req.session.user._id,
        {
          password,
          postalCode,
          address,
          detailAddress,
          phone,
        }
      );
      req.session.user = updatedUser;
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("서버 에러");
    }
  },
  validate,
];
