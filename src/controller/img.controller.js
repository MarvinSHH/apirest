const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { getConnection } = require("./../database/database");

// Configuración de multer para usar Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cloudinary creará esta carpeta si no existe
    format: async (req, file) => "jpg", // Puedes cambiar esto según el formato deseado
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });

// Función para manejar la subida de la foto
const uploadFoto = async (req, res) => {
  try {
    const { idcliente } = req.body;
    const fotoUrl = req.file.path; // Cloudinary proporciona la URL en file.path

    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE tblclientesasignadosarepartidores SET foto = ? WHERE idcliente = ?",
      [fotoUrl, idcliente]
    );
    res.json({ message: "Foto subida exitosamente", fotoUrl });
  } catch (error) {
    console.error("Error en el servidor:", error.message);
    res.status(500).send(error.message);
  }
};

export const methods = {
  uploadFoto,
};
