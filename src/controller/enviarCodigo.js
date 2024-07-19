//src/controller/recuperacionContrasenia.controller.js

import { getConnection } from "../database/database";
import nodemailer from "nodemailer";

// Configurar el transporte de nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "purificadoralosreyes32@gmail.com",
    pass: "aokf czsr hvob tplr",
  },
});

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
      // Generar un código de verificación
      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      // Enviar el código de verificación por correo electrónico
      const mailOptions = {
        from: "purificadoralosreyes32@gmail.com",
        to: email,
        subject: "Código de verificación",
        text: `Tu código de verificación es ${verificationCode}`,
      };

      await transporter.sendMail(mailOptions);

      // Guardar el código de verificación en la base de datos (o en memoria, según tu preferencia)
      res.status(200).json({ success: true, verificationCode });
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
