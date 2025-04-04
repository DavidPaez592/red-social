require("dotenv").config();
const express = require("express");
const cors = require("cors"); // 👈 importa cors
const sequelize = require("./config/database");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

// 👇 habilita CORS para que el frontend pueda hacer peticiones
app.use(cors({
  origin: 'http://localhost:3001', // donde corre tu frontend
  credentials: true
}));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Base de datos conectada");
  app._router && console.log("Rutas montadas:", app._router.stack.map(r => r.route?.path).filter(Boolean));

  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
});
