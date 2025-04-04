const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "XEPDB1",
  dialect: "oracle",
  dialectOptions: {
    connectString: "localhost:1521/XEPDB1", // IMPORTANTE: fuera de Docker usás localhost
  },
});

module.exports = sequelize;
