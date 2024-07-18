//src/controller/recuperacionContrasenia.controller.js

import { getConnection } from "./../database/database";

// Verificar si el correo existe
const verificarCorreo = async (req, res) => {
  try {
    const { email } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT email FROM tblrepartidor WHERE email = ?",
      [email]
    );

    if (result.length > 0) {
      res.status(200).json({ success: true, message: "Correo encontrado" });
    } else {
      res.status(404).json({ success: false, message: "Correo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

export const methods = {
  verificarCorreo,
};
