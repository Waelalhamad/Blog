const { Router } = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");
const router = Router();

router.get(
  "/",
  authMiddleware.protect,
  authorizeMiddleware.allow("mod", "admin"),
  userController.getAllUsers
);
router.post(
  "/",
  authMiddleware.protect,
  authorizeMiddleware.allow("mod", "admin"),
  userController.addUser
);
router.patch("/:id", authMiddleware.protect, userController.updateUser);
router.delete(
  "/:id",
  authMiddleware.protect,
  authorizeMiddleware.allow("mod", "admin"),
  userController.deleteUser
);
router.get(
  "/me/profile",
  authMiddleware.protect,
  userController.getUserDetails
);

module.exports = router;
