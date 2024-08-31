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
