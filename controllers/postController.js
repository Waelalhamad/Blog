const postService = require("../services/postService");
const commentService = require("../services/commentService");
const userService = require("../services/userService");

exports.getAllPosts = async (req, res, next) => {
  const category = req.query.category || null;
  try {
    const posts = await postService.getAllPosts(category);
    return res
      .status(200)
      .send({ status: "success", result: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

exports.getPostDetails = async (req, res, next) => {
  const id = req.params.postId;
  try {
    const post = await postService.getPostDetails(id);

    return res.status(200).send({ status: "success", post: post });
  } catch (error) {
    return next(error);
  }
};

exports.createPost = async (req, res, next) => {
  const id = req.user._id;
  const postData = { ...req.body, user: id };
  try {
    const post = await postService.createPost(postData);
    return res.status(201).send({ status: "success", data: post });
  } catch (error) {
    return next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.user._id;

  try {
    const post = await postService.updatePost(postId, userId, req.body);
    return res.status(200).send({ status: "success", data: post });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  const user = req.user;

  try {
    await postService.deletePost(postId, user);
    return res.status(204).send("Deleted!");
  } catch (error) {
    next(error);
  }
};

exports.getPostsByUser = async (req, res, next) => {
  const userId = req.params.userId || req.user._id;

  try {
    const posts = await userService.getPosts(userId);
    return res
      .status(200)
      .send({ status: "success", result: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.user._id;
  const commentData = { ...req.body, user: userId, post: postId };
  try {
    const comment = await commentService.createComment(commentData);
    return res.status(201).send({ status: "success", data: comment });
  } catch (error) {
    next(error);
  }
};
exports.updateComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;
  const commentContent = req.body.content;
  try {
    const comment = await commentService.updateComment(
      commentId,
      userId,
      commentContent
    );

    return res
      .status(200)
      .send({ status: "success", message: "Comment updated successfully!" });
  } catch (error) {
    next(error);
  }
};
exports.deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  const userId = req.user._id;
  try {
    await commentService.deleteComment(commentId, userId);
    return res
      .status(200)
      .send({ status: "success", message: "Comment deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

exports.toggleLike = async (req, res, next) => {
  const userId = req.user._id;
  const postId = req.params.postId;

  try {
    const result = await postService.toggleLike(postId, userId);
    return res.status(200).send({ status: "success", message: result });
  } catch (error) {
    next(error);
  }
};
