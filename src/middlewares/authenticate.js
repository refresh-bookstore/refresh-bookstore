const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretOrPrivateKey = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).send("Unauthorized request");
    return;
  }

  try {
    const decoded = jwt.verify(token, secretOrPrivateKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized request");
  }
}

module.exports = authenticate;
