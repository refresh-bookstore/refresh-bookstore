const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUserById = async id => {
  const user = await User.findById(id);
  return user;
};

exports.updateUserById = async (id, data) => {
  try {
    const user = await User.findById(id);

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
