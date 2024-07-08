//src/controller/repartidorAuth.controller.js
import bcrypt from "bcryptjs";
import { getConnection } from "../database/database";

const registerRepartidor = async (req, res) => {
  const { nombre, apaterno, amaterno, email, contrasenia, telefono } = req.body;
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "INSERT INTO tblrepartidor (nombre, apaterno, amaterno, email, contrasenia, telefono) VALUES (?, ?, ?, ?, ?, ?)",
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

export const methods = {
  registerRepartidor,
};
