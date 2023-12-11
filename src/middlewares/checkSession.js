import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();

const checkSession = async (req, res, next) => {
  if (!req.session || !req.session.email) {
    return next();
  }
  try {
    const user = await userRepository.findByEmail(req.session.email);
    if (!user) {
      delete req.session.email; // Clear the email from the session if the user is not found
      return next();
    }
    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
module.exports = checkSession;
