const Post = require("../models/post.model");
const User = require("../models/user.model");

// Crear una publicación
const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({ content, userId: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error al crear publicación", error });
  }
};

// Listar publicaciones de otros usuarios
const listPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: { [require("sequelize").Op.ne]: req.user.id } },
      include: { model: User, attributes: ["name"] },
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener publicaciones", error });
  }
};

// Dar like a una publicación
const likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Publicación no encontrada" });

    post.likes += 1;
    await post.save();

    res.json({ message: "Like agregado", likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: "Error al dar like", error });
  }
};

// Listar publicaciones del usuario autenticado (para perfil)
const listMyPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.user.id },
      include: { model: User, attributes: ["name"] },
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tus publicaciones", error });
  }
};


module.exports = { createPost, listPosts, likePost, listMyPosts };

