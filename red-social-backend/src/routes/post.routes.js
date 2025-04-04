const express = require("express");
const { createPost, listPosts, likePost } = require("../controllers/post.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticateToken, createPost);
router.get("/", authenticateToken, listPosts);
router.post("/:id/like", authenticateToken, likePost);

router.post("/", authenticateToken, (req, res, next) => {
    console.log("Ruta POST /posts alcanzada");
    next();
  }, createPost);
  

module.exports = router;
