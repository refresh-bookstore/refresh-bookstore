const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.login = async (email, password) => {
  try {
    // 이메일로 사용자를 찾음
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("이메일 주소를 확인해주세요.");
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("비밀번호를 확인해주세요.");
    }

    // JWT 생성
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  } catch (err) {
    throw err;
  }
};

exports.getUserInfo = async (token) => {
  try {
    // JWT 검증
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);

    return {
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
    };
  } catch (err) {
    throw err;
  }
};
