const { Router } = require("express");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const postRouter = Router();

// Get all posts
postRouter.get("/", postController.getAllPosts);

// Create a new post
postRouter.post("/", authMiddleware.protect, postController.createPost);

// Add a comment to a post
postRouter.post(
  "/:postId/comment",
  authMiddleware.protect,
  postController.createComment
);

// Like or unlike a post
postRouter.post(
  "/:postId/like",
  authMiddleware.protect,
  postController.toggleLike
);

// Update a post
postRouter.patch("/:postId", authMiddleware.protect, postController.updatePost);

// Delete a post
postRouter.delete(
  "/:postId",
  authMiddleware.protect,
  postController.deletePost
);

// Update a comment
postRouter.patch(
  "/:postId/comment/:commentId",
  authMiddleware.protect,
  postController.updateComment
);

// Delete a comment
postRouter.delete(
  "/:postId/comment/:commentId",
  authMiddleware.protect,
  postController.deleteComment
);

module.exports = postRouter;