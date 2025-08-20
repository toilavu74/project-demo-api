const { PrismaClient } = require("../../generated/client");
const prisma = new PrismaClient();

const createCountry = async (data) => {
  return await prisma.country.create({ data });
};
const editCountry = async (id, data) => {
  return await prisma.country.update({ where: { id }, data });
};
const deleteCountry = async (id) => {
  return await prisma.country.delete({ where: { id } });
};
const listCountry = async () => {
  return await prisma.country.findMany();
};
module.exports = {
  createCountry,
  editCountry,
  deleteCountry,
  listCountry,
};
