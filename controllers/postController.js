const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const Like = require("../models/likeModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res
      .status(200)
      .send({ status: "success", result: posts.length, data: posts });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const id = req.user._id;
  const postData = { ...req.body, user: id };
  try {
    const post = await Post.create(postData);
    return res.status(201).send({ status: "success", data: post });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  const updatedData = req.body;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists and belongs to the user
    if (!post) {
      return res
        .status(404)
        .send({ status: "fail", message: "Post not found" });
    }
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).send({
        status: "fail",
        message: "You are not authorized to update this post",
      });
    }

    // Update the post with the new data
    Object.assign(post, updatedData);
    await post.save();

    return res.status(200).send({ status: "success", data: post });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists and belongs to the user
    if (!post) {
      return res
        .status(404)
        .send({ status: "fail", message: "Post not found" });
    }
    if (post.user.toString() !== userId.toString()) {
      return res.status(403).send({
        status: "fail",
        message: "You are not authorized to delete this post",
      });
    }

    // Remove the post
    await post.remove();

    // Optionally, you could also remove related comments and likes here
    await Comment.deleteMany({ post: postId });
    await Like.deleteMany({ post: postId });

    return res.status(204).send(); // 204 No Content
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.createComment = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  const commentData = { ...req.body, user: userId, post: postId };
  try {
    const comment = await Comment.create(commentData);
    const post = await Post.findById(postId);
    post.commentsCount += 1;
    await post.save();
    return res.status(201).send({ status: "success", data: comment });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.toggleLike = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;
  let message;
  try {
    const like = { user: userId, post: postId };
    const isLiked = await Like.findOne(like);

    const post = await Post.findById(postId);
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

    return res.status(201).send({ status: "success", message: message });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;
  const updatedData = req.body;

  try {
    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    // Check if the comment exists and belongs to the user
    if (!comment) {
      return res
        .status(404)
        .send({ status: "fail", message: "Comment not found" });
    }
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).send({
        status: "fail",
        message: "You are not authorized to update this comment",
      });
    }

    // Update the comment with the new data
    Object.assign(comment, updatedData);
    await comment.save();

    return res.status(200).send({ status: "success", data: comment });
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;

  try {
    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    // Check if the comment exists and belongs to the user
    if (!comment) {
      return res
        .status(404)
        .send({ status: "fail", message: "Comment not found" });
    }
    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).send({
        status: "fail",
        message: "You are not authorized to delete this comment",
      });
    }

    // Remove the comment
    await comment.remove();

    // Update the post's comments count
    const post = await Post.findById(comment.post);
    post.commentsCount -= 1;
    await post.save();

    return res.status(204).send(); // 204 No Content
  } catch (error) {
    return res.status(500).send({ status: "fail", message: error.message });
  }
};
