const express = require("express");

const router = express.Router();

const postsCtrl = require("../controllers/posts-controllers");

router.get("/", postsCtrl.getPosts);

router.get("/:pid", postsCtrl.getPostById);

router.post("/", postsCtrl.createPost);

router.delete("/:pid", postsCtrl.deletePost);

module.exports = router;
