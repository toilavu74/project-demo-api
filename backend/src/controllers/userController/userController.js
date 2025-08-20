const { PrismaClient } = require("../../generated/client");
const prisma = new PrismaClient();
const userModel = require("../../models/userModel/userModel");
const userValidation = require("../../validation/userValidation/userValidation");
const userUpdateValtion = require("../../validation/userValidation/userUpdateValidation");
const bcrypt = require("bcryptjs");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
}).array("avatar", 1);

const registerUser = async (req, res) => {
  const data = req.body;
  const avatarFiles = req.files || [];
  console.log(data);
  console.log(avatarFiles);
  const errors = userValidation(data, avatarFiles);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  const errorEmail = await userModel.checkEmail(data.email);
  if (Object.keys(errorEmail).length > 0) {
    return res.status(400).json({ email: "Email da ton tai" });
  }

  const saveFiles = [];
  avatarFiles.forEach((file) => {
    const fileName = `${Date.now()} - ${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    const filePath = `public/uploads/user/${fileName}`;
    fs.writeFileSync(filePath, file.buffer);
    saveFiles.push(fileName);
  });
  data.level = 0;
  data.avatar = JSON.stringify(saveFiles);
  data.password = await bcrypt.hash(data.password, 10);

  try {
    const user = await userModel.registerUser(data);
    return res.json(user);
  } catch (error) {
    saveFiles.forEach((fileName) => {
      const filePath = `public/uploads/user/${fileName}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    return res.status(500).json({ error: "Loi tao user" });
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await userModel.getUserById(userId);
  if (user) {
    return res.json(user);
  } else {
    return res.status(400).json({ error: "ID user ko ton tai" });
  }
};

const checkLoginUser = async (req, res) => {
  const data = req.body;
  if (!data.email) {
    return res.status(400).json({ message: "vui long nhap email" });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({ message: "Email ko dung dinh dang" });
    }
  }
  if (!data.password) {
    return res.status(400).json({ message: "vui long nhap password" });
  }
  const checkLogin = await userModel.checkLoginUser(data);
  if (!checkLogin) {
    return res.status(400).json({ error: "Sai email hoac mat khau" });
  } else {
    return res.json({
      success: "Dang nhap thanh cong",
      user: checkLogin,
    });
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const avatarFiles = req.files || [];
  const errors = userUpdateValtion(data, avatarFiles);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  let saveFiles = [];
  if (avatarFiles.length > 0) {
    avatarFiles.forEach((file) => {
      const fileName = `${Date.now()} - ${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      const filePath = `public/uploads/user/${fileName}`;
      fs.writeFileSync(filePath, file.buffer);
      saveFiles.push(fileName);
    });
    data.avatar = JSON.stringify(saveFiles);
  } else {
    const oldUser = await userModel.getUserById(id);
    data.avatar = oldUser.avatar;
  }
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  } else {
    const oldUser = await userModel.getUserById(id);
    data.password = oldUser.password;
  }

  const user = await userModel.updateUser(id, data);
  return res.json(user);
};

module.exports = {
  registerUser,
  upload,
  getUserById,
  checkLoginUser,
  updateUser,
};
