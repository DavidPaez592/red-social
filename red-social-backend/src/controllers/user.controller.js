const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Registrar usuario
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Usuario creado", user });
  } catch (error) {
    res.status(400).json({ message: "Error al registrar usuario", error });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, attributes: ["id", "name", "email", "password"] });
    console.log("Usuario encontrado:", user); // Agrega esto

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ⚠️ Importante: quitar la contraseña del objeto antes de enviarlo
    const { password: _, ...safeUser } = user.toJSON();

    res.json({ message: "Login exitoso", user: safeUser, token }); // <-- enviar user aquí también
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};


// Obtener perfil del usuario autenticado
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email"] });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error });
  }
};

module.exports = { register, login, getProfile };
