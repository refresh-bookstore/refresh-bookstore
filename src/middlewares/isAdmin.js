exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "허용되지 않은 요청입니다." });
  }
};
