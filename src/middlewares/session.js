const session = require("express-session");

const sessionConfig = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};

// 세션 미들웨어 생성
const sessionMiddleware = session(sessionConfig);

// 미들웨어 내보내기
module.exports = sessionMiddleware;
