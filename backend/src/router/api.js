const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController/userController");
const blogController = require("../controllers/blogController/blogController");
const countryController = require("../controllers/countryController/countryController");
const jwt = require("jsonwebtoken");
function requireAuth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized1" });
  }
  try {
    const decoded = jwt.verify(token, "admin");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(401).json({ error: "Unauthorized2" });
  }
}

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
router.get("/admin/blog/show/:id", blogController.getBlogById);

// API Country
router.post("/admin/country/add", countryController.createCountry);
router.put("/admin/country/edit/:id", countryController.editCountry);
router.delete("/admin/country/delete/:id", countryController.deleteCountry);
router.get("/admin/country/list", countryController.listCountry);
router.get("/admin/country/show/:id", countryController.getCountryById);
module.exports = router;
