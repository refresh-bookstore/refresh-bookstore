const express = require("express");
const router = express.Router();
const checkSession = require("../middlewares/checkSession");

router.get("/", checkSession, (req, res) => {
  const { name, email, address, phone } = req.session.user;
  res.render("user-mypage", { name, email, address, phone });
});

router.post("/", checkSession, async (req, res) => {
  // 체크세션 미들웨어로 세션 유무를 확인합니다.

  // 사용자가 입력한 값 가져오기
  const { password, address, phone } = req.body;

  try {
    // DB에서 현재 로그인한 사용자 정보 가져오기
    const user = await User.findById(req.session.user._id);

    // 사용자가 입력한 값을 DB에 업데이트하기
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.address = address;
    user.phone = phone;

    // DB 업데이트 후 세션에 사용자 정보 저장하기
    req.session.user = user;
    await user.save();

    // 사용자 정보 수정 완료 후 홈으로 리다이렉트
    res.redirect("/");
  } catch (err) {
    // 에러 처리
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
