//src/controller/auth.controller.js
import jwt from "jsonwebtoken";
import { getConnection } from "../database/database";

const login = async (req, res) => {
  const { email, contrasenia } = req.body;
  try {
    const connection = await getConnection();
    console.log("Connected to database");

    // Verificar en tbladmin
    let rows = await connection.query(
      "SELECT * FROM tbladmin WHERE email = ?",
      [email]
    );
    console.log("Query result from tbladmin:", rows);

    let user;
    let role;

    if (rows && rows.length > 0) {
      user = rows[0];
      role = "admin";
    } else {
      // Si no se encuentra en tbladmin, verificar en tblrepartidor
      rows = await connection.query(
        "SELECT * FROM tblrepartidor WHERE email = ?",
        [email]
      );
      console.log("Query result from tblrepartidor:", rows);

      if (rows && rows.length > 0) {
        user = rows[0];
        role = "repartidor";
      }
    }

    if (!user) {
      console.log("Email not found:", email);
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Comparar contraseñas directamente para depuración
    if (contrasenia !== user.contrasenia) {
      console.log("Invalid password for email:", email);
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      { id: user.idadmin || user.idrepartidor, role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    console.log("Token generated:", token);
    res.json({ token, userType: role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  const { nombre, apaterno, amaterno, email, contrasenia } = req.body;
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "INSERT INTO tbladmin (nombre, apaterno, amaterno, email, contrasenia) VALUES (?, ?, ?, ?, ?)",
      [nombre, apaterno, amaterno, email, contrasenia]
    );
    res.status(201).json({ message: "User registered successfully", result });
  } catch (error) {
    console.error(error); // Debugging log
    res.status(500).json({ message: "Internal server error" });
  }
};

export const methods = {
  login,
  register,
};
