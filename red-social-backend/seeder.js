require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("./src/config/database");
const User = require("./src/models/user.model");
const Post = require("./src/models/post.model");

const MAX_RETRIES = 20;
const RETRY_DELAY = 5000; // 5 segundos

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const tryConnect = async () => {
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      console.log(`🔌 Intentando conectar a la base de datos (intento ${i})...`);
      await sequelize.authenticate();
      console.log("✅ Conexión establecida con éxito.");
      return;
    } catch (error) {
      console.log(`❌ Falló el intento ${i}: ${error.message}`);
      if (i === MAX_RETRIES) throw new Error("No se pudo conectar a la base de datos después de varios intentos.");
      await wait(RETRY_DELAY);
    }
  }
};

const seed = async () => {
  try {
    await tryConnect(); // 🔄 Espera hasta que Oracle esté lista

    await sequelize.sync({ force: true }); // Borra y vuelve a crear tablas

    // Contraseñas únicas por usuario
    const passwords = await Promise.all([
      bcrypt.hash("alicepass", 10),
      bcrypt.hash("bobpass", 10),
      bcrypt.hash("charliepass", 10),
    ]);

    // Crear usuarios con email, nombre y contraseña únicos
    const users = await User.bulkCreate([
      { name: "Alice", email: "alice@example.com", password: passwords[0] },
      { name: "Bob", email: "bob@example.com", password: passwords[1] },
      { name: "Charlie", email: "charlie@example.com", password: passwords[2] },
    ]);

    // Un post para cada usuario
    await Post.bulkCreate([
      { content: "Hoy me siento bien!", userId: users[0].id },
      { content: "Los coches son mi pasión.", userId: users[1].id },
      { content: "A mí me gustan los chocolates.", userId: users[2].id },
    ]);

    console.log("✅ Seeder completado con éxito.");
    process.exit();
  } catch (error) {
    console.error("❌ Error en el seeder:", error);
    process.exit(1);
  }
};


seed();
