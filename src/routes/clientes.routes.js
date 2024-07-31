//src/routes/clientes.routes.js

import { Router } from "express";
import { methods as lenguageController } from "../controller/clientes.controller";
import verifyToken from "../middleware/auth.middleware";
import multer from "multer";
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const router = Router();

//----------------INICIO FOTOGRAFIA-----------------------
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "jpg", // Puedes cambiar esto según el formato deseado
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage }).single("foto");

//----------------FIN FOTOGRAFIA-------------------------
//
router.get(
  "/repartidores",
  verifyToken,
  lenguageController.obtenerRepartidoresConClientes
);

router.get("/", verifyToken, lenguageController.getClientes);
router.get("/:idcliente", verifyToken, lenguageController.getCliente);
router.delete("/:idcliente", verifyToken, lenguageController.DeleteCliente);
router.post("/", verifyToken, lenguageController.addCliente);
router.put("/:idcliente", verifyToken, lenguageController.updateCliente);
router.post("/asignar", verifyToken, lenguageController.asignarClientes);
router.get(
  "/repartidor/:idrepartidor",
  verifyToken,
  lenguageController.obtenerClientesAsignados
);
router.delete(
  "/asignacion/:idcliente/:idrepartidor",
  verifyToken,
  lenguageController.eliminarAsignacionCliente
);
router.put("/visitado/:idcliente", lenguageController.confirmarVisita);
router.post(
  "/upload",
  verifyToken,
  upload.single("foto"),
  lenguageController.uploadFoto
);

export default router;
