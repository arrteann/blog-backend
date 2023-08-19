const express = require("express");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const postsCtrl = require("../controllers/posts-controllers");

router.get("/", postsCtrl.getPosts);

router.get("/:pid", postsCtrl.getPostById);

router.use(authMiddleware);

router.post(
  "/",
  [check("title").not().isEmpty(), check("content").isLength(5)],
  postsCtrl.createPost
);

router.delete("/:pid", postsCtrl.deletePost);

module.exports = router;
