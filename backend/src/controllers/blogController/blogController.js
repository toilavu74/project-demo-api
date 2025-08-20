const { PrismaClient } = require("../../generated/client");
const prisma = new PrismaClient();
const blogValidation = require("../../validation/blogValidation/blogValidation");
const blogModel = require("../../models/blogModel/blogModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
}).array("image", 5);

const createBlog = async (req, res) => {
  const data = req.body;
  const avatarFiles = req.files || [];
  console.log(data);
  const errors = blogValidation(data, avatarFiles);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  const savedFiles = [];
  avatarFiles.forEach((file) => {
    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    const filePath = `public/uploads/blog/${filename}`;
    fs.writeFileSync(filePath, file.buffer);
    savedFiles.push(filename);
  });
  data.image = JSON.stringify(savedFiles);

  try {
    const blog = await blogModel.createBlog(data);
    return res.json(blog);
  } catch (error) {
    saveFiles.forEach((fileName) => {
      const filePath = `public/uploads/blog/${fileName}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    return res.status(500).json({ error: "Loi tao blog" });
  }
};

const editBlog = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  const avatarFiles = req.files || [];
  console.log(data);
  const errors = blogValidation(data, avatarFiles);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  const savedFiles = [];
  avatarFiles.forEach((file) => {
    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    const filePath = `public/uploads/blog/${filename}`;
    fs.writeFileSync(filePath, file.buffer);
    savedFiles.push(filename);
  });
  data.image = JSON.stringify(savedFiles);
  const blog = await blogModel.editBlog(id, data);
  return res.json(blog);
};

const deleteBlog = async (req, res) => {
  const id = parseInt(req.params.id);
  const blog = await blogModel.deleteBlog(id);
  return res.json(blog);
};

const listBlog = async (req, res) => {
  const blog = await blogModel.listBlog();
  return res.json(blog);
};

module.exports = {
  createBlog,
  upload,
  editBlog,
  deleteBlog,
  listBlog,
};
