const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const hashPassword = require("../middlewares/hashPassword");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("login/login.html");
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
    // 로그인 폼에서 전송된 비밀번호를 다시 한 번 해싱하여 검증
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
      return res.status(500).json({ message: "JWT_SECRET is not set" });
    }

    res.json({ message: "로그인이 되었습니다.", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "서버에 접속하지 못했습니다. 나중에 다시 시도해주세요.",
    });
  }
});

module.exports = router;
