require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const hashPassword = require("../middlewares/hashPassword");
const checkSession = require("../middlewares/checkSession");
const router = express.Router();

router.get("/", checkSession, (req, res) => {
  if (req.session.user) {
    return res.json({
      message: "이미 로그인 되어있습니다. 홈으로 이동합니다.",
      redirect: "/",
    });
  }
  res.render("login/login");
});

router.post("/", hashPassword, async (req, res) => {
  const { email } = req.body;
  const password = req.body.password;

  try {
    // 이메일로 사용자를 찾음
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "이메일 주소를 확인해주세요." });
    }

    // 전송된 비밀번호와 저장된 비밀번호를 검증
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "비밀번호를 확인해주세요." });
    // }

    const dbPassword = await bcrypt.hash(password, 10);
    console.log(dbPassword);
    console.log(user.password);

    if (dbPassword == !user.password) {
      return res.status(401).json({ message: "비밀번호를 확인해주세요." });
    }

    // JWT 생성 및 전송
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET Missing!!" });
    }

    // 세션 저장 미들웨어를 통해 세션 저장
    req.session.user = {
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
    };

    // 이미 로그인된 경우, 홈디렉토리로 이동하도록 함
    res.json({
      message: "이미 로그인 되어있습니다. 홈으로 이동합니다.",
      redirect: "/",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "서버에 접속하지 못했습니다. 나중에 다시 시도해주세요.",
    });
  }
});

module.exports = router;
