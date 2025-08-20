const { PrismaClient } = require("../../generated/client");
const prisma = new PrismaClient();

const createBlog = async (data) => {
  return await prisma.blog.create({ data });
};

const editBlog = async (id, data) => {
  return await prisma.blog.update({
    where: { id },
    data,
  });
};

const deleteBlog = async (blogId) => {
  return await prisma.blog.delete({ where: { id: blogId } });
};

const listBlog = async () => {
  return await prisma.blog.findMany();
};

module.exports = {
  createBlog,
  editBlog,
  deleteBlog,
  listBlog,
};
