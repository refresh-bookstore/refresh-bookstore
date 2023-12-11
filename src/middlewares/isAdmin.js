import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();

exports.isAdmin = async (req, res, next) => {
  if (!req.session.email) {
    return res.status(403).json({ message: "허용되지 않은 요청입니다." });
  }

  try {
    const user = await userRepository.findByEmail(req.session.email);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "허용되지 않은 요청입니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};
