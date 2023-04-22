const User = require("../models/User");

const checkSession = async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  try {
    const user = await User.findOne({ email: req.session.user.email });
    if (!user) {
      // 세션에 저장된 사용자 정보와 일치하는 사용자가 없는 경우, 세션을 제거하고 다음 미들웨어로 이동합니다.
      delete req.session.user;
      return next();
    }

    // 세션에 저장된 사용자 정보와 일치하는 사용자가 있는 경우, 다음 미들웨어로 이동합니다.
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = checkSession;
