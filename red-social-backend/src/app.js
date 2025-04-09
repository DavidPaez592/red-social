require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Habilita CORS
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/posts", postRoutes); // ✅ Esto asegura que /posts/my-posts funcione

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Base de datos conectada");
  app._router && console.log("Rutas montadas:", app._router.stack.map(r => r.route?.path).filter(Boolean));

  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
});
