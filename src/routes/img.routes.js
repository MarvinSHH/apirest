import { Router } from "express";
import { methods as lenguageController } from "../controller/img.controller";
import verifyToken from "../middleware/auth.middleware";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const router = Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "jpg", // Puedes cambiar esto según el formato deseado
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });

// Ruta para subir la foto
router.post(
  "/upload",
  verifyToken,
  upload.single("foto"),
  lenguageController.uploadFoto
);

export default router;
