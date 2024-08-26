const { Router } = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");
const router = Router();

router.get(
  "/",
  authMiddleware.protect,
  authorizeMiddleware.allow("mod", "admin"),
  userController.getAllUsers
);
router.post("/", userController.addUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);

module.exports = router;
