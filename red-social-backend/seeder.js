require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelize = require("./src/config/database");
const User = require("./src/models/user.model");
const Post = require("./src/models/post.model");

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // Borra y vuelve a crear tablas

    const password = await bcrypt.hash("123456", 10);

    const users = await User.bulkCreate([
      { name: "Alice", email: "alice@example.com", password },
      { name: "Bob", email: "bob@example.com", password },
      { name: "Charlie", email: "charlie@example.com", password },
    ]);

    await Post.bulkCreate([
      { content: "Post de Alice", userId: users[0].id },
      { content: "Post de Bob", userId: users[1].id },
      { content: "Post de Charlie", userId: users[2].id },
    ]);

    console.log("✅ Seeder completado con éxito.");
    process.exit();
  } catch (error) {
    console.error("❌ Error en el seeder:", error);
    process.exit(1);
  }
};

seed();