/**
 * src/config/swagger.js
 */
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Red Social API",
      version: "1.0.0",
      description: "Documentación de la API para la prueba técnica. Incluye usuarios y publicaciones."
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;


/**
 * src/routes/user.routes.js
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para usuarios
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Error al registrar
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión y obtener token JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales incorrectas
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */


/**
 * src/routes/post.routes.js
 */
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints para publicaciones
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Posts]
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
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Listar publicaciones de otros usuarios
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Dar like a una publicación
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Like agregado
 *       404:
 *         description: Publicación no encontrada
 *       401:
 *         description: No autorizado
 */
