const { Router } = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const postRouter = Router();

//Get endpoints
postRouter.get("/", postController.getAllPosts);
postRouter.get("/:postId", postController.getPostDetails);
postRouter.post("/", authMiddleware.protect, postController.createPost);
postRouter.patch("/:postId", authMiddleware.protect, postController.updatePost);
postRouter.delete(
  "/:postId",
  authMiddleware.protect,
  postController.deletePost
);
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
postRouter.delete(
  "/comments/:commentId",
  authMiddleware.protect,
  postController.deleteComment
);
postRouter.patch(
  "/comments/:commentId",
  authMiddleware.protect,
  postController.updateComment
);

module.exports = postRouter;
