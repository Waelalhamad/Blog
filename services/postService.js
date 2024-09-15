const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");
const User = require("../models/user");
const ApiError = require("../utils/apiError");
exports.getAllPosts = async (category) => {
  try {
    if (category) {
      return await Post.find({ category });
    }
    return await Post.find();
  } catch (error) {
    throw error;
  }
};
exports.getPostById = async (id) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new ApiError("Post not found!", 404);
    }
    return post;
  } catch (error) {
    throw error;
  }
};

exports.getPostDetails = async (id) => {
  try {
    const post = await this.getPostById(id);

    const comments = await Comment.find({ post: id })
      .populate("user", "firstName lastName")
      .select("content");

    return { ...post.toObject(), comments: comments };
  } catch (error) {
    throw error;
  }
};
exports.createPost = async (postData) => {
  try {
    const post = await Post.create(postData);
    return post;
  } catch (error) {
    throw error;
  }
};

exports.updatePost = async (postId, userId, postData) => {
  try {
    const post = await this.getPostById(postId);
    if (post.user.toString() != userId.toString())
      throw new ApiError("Unauthorized", 401);
    const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
      new: true,
      runValidators: true,
    });
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

exports.deletePost = async (postId, user) => {
  try {
    const post = await this.getPostById(postId);
    if (post.user.toString() != user._id.toString()) {
      if (userId.role != "admin") throw new ApiError("Unauthorized", 401);
    }
    await Comment.deleteMany({ post: postId });
    await Like.deleteMany({ post: postId });
    await Post.findByIdAndDelete(postId);
  } catch (error) {
    throw error;
  }
};

exports.toggleLike = async (postId, userId) => {
  let message;
  try {
    const post = await this.getPostById(postId);
    const like = { user: userId, post: postId };
    const isLiked = await Like.findOne(like);
    if (!isLiked) {
      await Like.create(like);
      post.likes += 1;
      message = "Post Liked";
    } else {
      await Like.findByIdAndDelete(isLiked._id);
      post.likes -= 1;
      message = "Post Unliked";
    }
    await post.save();
    return message;
  } catch (error) {
    throw error;
  }
};
