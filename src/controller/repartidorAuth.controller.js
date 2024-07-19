//src/controller/repartidorAuth.controller.js
import bcrypt from "bcryptjs";
import { getConnection } from "../database/database";

const registerRepartidor = async (req, res) => {
  const { nombre, apaterno, amaterno, email, contrasenia, telefono } = req.body;
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "INSERT INTO tblrepartidor (nombre, apaterno, amaterno, email, contrasenia, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, apaterno, amaterno, email, contrasenia, telefono]
    );
    res
      .status(201)
      .json({ message: "Repartidor registrado exitosamente", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const recuperarContrasenia = async (req, res) => {
  const { email, preguntaSecreta, respuestaSecreta, nuevaContrasenia } =
    req.body;
  try {
    const connection = await getConnection();
    const [user] = await connection.query(
      "SELECT * FROM tblrepartidor WHERE email = ? AND pregunta_secreta = ? AND respuesta_secreta = ?",
      [email, preguntaSecreta, respuestaSecreta]
    );

    if (user.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Credenciales incorrectas" });
    }

    await connection.query(
      "UPDATE tblrepartidor SET contrasenia = ? WHERE email = ?",
      [nuevaContrasenia, email]
    );

    res
      .status(200)
      .json({ success: true, message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const methods = {
  registerRepartidor,
  recuperarContrasenia,
};
