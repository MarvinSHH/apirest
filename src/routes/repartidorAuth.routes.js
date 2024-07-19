//src/routes/repartidorAuth.routes.js
import { Router } from "express";
import { methods as repartidorAuthController } from "../controller/repartidorAuth.controller";
import { methods as recuperarContraenia } from "../controller/enviarCodigo";

const router = Router();

router.post("/register", repartidorAuthController.registerRepartidor);
router.post("/verificarCorreo", recuperarContraenia.verificarCorreo);

export default router;
