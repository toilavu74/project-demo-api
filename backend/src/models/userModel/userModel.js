const { PrismaClient } = require("../../generated/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const errors = {};

const registerUser = async (data) => {
  return prisma.user.create({ data });
};

const checkEmail = async (email) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    errors.email = "email da ton tai";
  }
  return errors;
};

const getUserById = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

const checkLoginUser = async (data) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      AND: {
        email: data.email,
      },
    },
  });
  if (!existingUser) {
    return false;
  }
  const passwordMatch = await bcrypt.compare(
    data.password,
    existingUser.password
  );
  if (!passwordMatch) {
    return false;
  }
  return existingUser;
};

const updateUser = (id, data) => {
  return prisma.user.update({
    where: { id: id },
    data: data,
  });
};

module.exports = {
  registerUser,
  checkEmail,
  getUserById,
  checkLoginUser,
  updateUser,
};
