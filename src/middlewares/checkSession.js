import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();

const checkSession = async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  try {
    const user = await userRepository.findByEmail(req.session.user.email);
    if (!user) {
      delete req.session.user;
      return next();
    }

    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = checkSession;
