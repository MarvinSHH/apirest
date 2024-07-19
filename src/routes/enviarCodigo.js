//src/routes/recuperacionContrasenia.routes.js

import { Router } from "express";
import { methods as recuperarController } from "../controller/enviarCodigo";

const router = Router();

router.post("/verificarCorreo", recuperarController.verificarCorreo);
router.post("/cambiarContrasenia", recuperarController.cambiarContrasenia);

export default router;
