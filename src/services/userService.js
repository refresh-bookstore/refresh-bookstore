const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUserByEmail = async email => {
  const user = await User.findOne({ email: email });
  return user;
};

exports.updateUserById = async (email, data) => {
  try {
    const user = await User.findOne({ email: email });

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }
    user.postalCode = data.postalCode;
    user.address = data.address;
    user.detailAddress = data.detailAddress;
    user.phone = data.phone;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
