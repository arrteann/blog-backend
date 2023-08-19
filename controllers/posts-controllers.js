const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
let posts = [
  {
    id: "p1",
    title: "hello world",
    content: "try to learning nodejs",
  },
  {
    id: "p2",
    title: "write in english",
    content: "i can speak in english",
  },
];

const getPostById = (req, res, next) => {
  const postId = req.params.pid;

  const post = posts.find((item) => {
    return item.id === postId;
  });

  res.json(post);
};

const getPosts = (req, res, next) => {
  res.json(posts);
};

const createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {  
    res.json(errors);
  }

  const { title, content } = req.body;

  const createdPost = {
    id: uuidv4(),
    title,
    content,
  };

  posts.push(createdPost);

  res.status(201).json({ post: createdPost });
};

const deletePost = (req, res, next) => {
  const postID = req.params.pid;

  posts.filter((post) => post.id !== postID);

  res.status(200).json({ message: "Post deleted successfuly" });
};

exports.getPostById = getPostById;
exports.getPosts = getPosts;
exports.createPost = createPost;
exports.deletePost = deletePost;
