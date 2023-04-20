const bcrypt = require("bcrypt");

const hashPassword = (req, res, next) => {
  // req.body 객체가 존재하지 않거나 비어있을 경우 예외 처리
  if (!req.body || !req.body.password) {
    return res.status(400).json({ message: "Invalid request" });
  }

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    req.body.password = hashedPassword;
    next();
  });
};

module.exports = hashPassword;
