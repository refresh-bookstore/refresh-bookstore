const authService = require("../services/authService");

exports.getLoginPage = (req, res) => {
  if (req.session.user) {
    return res.json({
      message: "이미 로그인 되어있습니다. 홈으로 이동합니다.",
      redirect: "/",
    });
  }
  res.render("login/login");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    req.session.user = await authService.getUserInfo(token);

    res.json({
      message: "로그인 되었습니다.",
      token: token,
      redirect: "/",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message:
        err.message || "서버에 접속하지 못했습니다. 나중에 다시 시도해주세요.",
    });
  }
};
