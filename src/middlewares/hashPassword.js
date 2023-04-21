const bcrypt = require("bcrypt");

const hashPassword = async (req, res, next) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = hashPassword;
