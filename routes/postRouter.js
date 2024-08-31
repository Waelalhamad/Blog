const { Router } = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const postRouter = Router();

//Get endpoints
postRouter.get("/", postController.getAllPosts);
postRouter.post("/", authMiddleware.protect, postController.createPost);
postRouter.post(
  "/:postId/comment",
  authMiddleware.protect,
  postController.createComment
);
postRouter.post(
  "/:postId/like",
  authMiddleware.protect,
  postController.toggleLike
);
module.exports = postRouter;
