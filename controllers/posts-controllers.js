const { validationResult } = require("express-validator");

const Post = require("../models/post");

const getPosts = (req, res, next) => {
  res.json(posts);
};

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  const post = await Post.findById(postId);

  res.json(post);
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json(errors);
  }

  const { title, content } = req.body;

  const createdPost = new Post({ title, content });

  await createdPost.save();

  res.status(201).json({ post: createdPost });
};

const deletePost = async (req, res, next) => {
  const postID = req.params.pid;

  const post = await Post.findById(postID);

  await post.deleteOne();

  res.status(200).json({ message: "Post deleted successfuly" });
};

exports.getPostById = getPostById;
exports.getPosts = getPosts;
exports.createPost = createPost;
exports.deletePost = deletePost;
