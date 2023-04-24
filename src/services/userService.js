const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUserByEmail = async email => {
  const user = await User.findOne({ email: email });
  return user;
};

exports.updateUserByEmail = async (email, data) => {
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

// 모든 사용자 정보 조회W
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 사용자 정보 삭제
exports.deleteUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    await user.delete();
    res.status(200).json({ message: "사용자 정보를 삭제하였습니다." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 전체 사용자 정보 수정
exports.updateAllUsers = async (req, res) => {
  try {
    const { postalCode, address, detailAddress, phone } = req.body;

    await User.updateMany(
      {},
      {
        $set: {
          postalCode: postalCode,
          address: address,
          detailAddress: detailAddress,
          phone: phone,
        },
      }
    );
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
