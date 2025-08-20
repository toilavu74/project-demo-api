const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController/userController");
const blogController = require("../controllers/blogController/blogController");
const countryController = require("../controllers/countryController/countryController");

// API User
router.post(
  "/admin/user/register",
  userController.upload,
  userController.registerUser
);
router.get("/admin/user/show/:id", userController.getUserById);
router.post("/admin/user/login", userController.checkLoginUser);
router.put(
  "/admin/user/update/:id",
  userController.upload,
  userController.updateUser
);

// API Blog
router.post(
  "/admin/blog/add",
  blogController.upload,
  blogController.createBlog
);
router.put(
  "/admin/blog/edit/:id",
  blogController.upload,
  blogController.editBlog
);
router.delete("/admin/blog/delete/:id", blogController.deleteBlog);
router.get("/admin/blog/list", blogController.listBlog);

// API Country
router.post("/admin/country/add", countryController.createCountry);
router.put("/admin/country/edit/:id", countryController.editCountry);
router.delete("/admin/country/delete/:id", countryController.deleteCountry);
router.get("/admin/country/list", countryController.listCountry);
module.exports = router;
