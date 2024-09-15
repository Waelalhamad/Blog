const Comment = require("../models/commentModel");
const User = require("../models/user");
const ApiError = require("../utils/apiError");
const postService = require("../services/postService");
exports.createComment = async (commentData) => {
  try {
    const post = await postService.getPostById(commentData.post);
    const comment = await Comment.create(commentData);
    post.commentsCount += 1;
    await post.save();
    return comment;
  } catch (error) {
    throw error;
  }
};

exports.updateComment = async (commentId, userId, commentContent) => {
  try {
    const comment = await Comment.findById(commentId);
    const user = await User.findById(userId);

    if (comment.user.toString() !== user._id.toString()) {
      throw new ApiError("You are not authorized to edit this comment", 401);
    }
    comment.content = commentContent;
    await comment.save();
    return comment;
  } catch (error) {
    throw error;
  }
};
exports.deleteComment = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId);
    const user = await User.findById(userId);

    if (comment.user.toString() !== user._id.toString()) {
      if (user.role != "admin") {
        throw new ApiError(
          "You are not authorized to delete this comment",
          401
        );
      }
    }
    const post = await postService.getPostById(comment.post);
    post.commentsCount -= 1;
    await post.save();
    await comment.deleteOne();
  } catch (error) {
    throw error;
  }
};
