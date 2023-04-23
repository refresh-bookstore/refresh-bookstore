const express = require("express");
const router = express.Router();
const { updateUserValidator } = require("../middlewares/userValidation");
const userService = require("../services/userService");

router.get("/mypage", async function (req, res) {
  try {
    // 로그인된 사용자의 ID를 가져옵니다.
    const userId = req.session.userId; // 예시로 세션을 이용한 로그인 구현을 가정합니다.

    // 사용자 ID를 이용하여 DB에서 사용자 정보를 조회합니다.
    const user = await userService.getUserById(userId);

    if (!user) {
      // 사용자 정보가 없을 경우 에러 처리
      return res.status(404).send("User not found");
    }

    // 사용자 정보를 포함한 마이페이지를 렌더링합니다.
    res.render("mypage", { user: user });
  } catch (err) {
    // 에러 처리
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/mypage/update", updateUserValidator, updateUserInfo);

module.exports = router;
