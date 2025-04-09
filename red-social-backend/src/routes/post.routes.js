const express = require("express");
const {
  createPost,
  listPosts,
  likePost,
  listMyPosts,
} = require("../controllers/post.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Publicaciones
 *   description: Endpoints para gestionar publicaciones
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear una publicación
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publicación creada
 */
router.post("/", authenticateToken, createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Listar publicaciones de otros usuarios
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   likes:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 */
router.get("/", authenticateToken, listPosts);

/**
 * @swagger
 * /posts/my-posts:
 *   get:
 *     summary: Listar publicaciones del usuario autenticado
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de publicaciones propias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   likes:
 *                     type: integer
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 */
router.get("/my-posts", authenticateToken, listMyPosts);

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Dar like a una publicación
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Like agregado
 */
router.post("/:id/like", authenticateToken, likePost);

module.exports = router;
