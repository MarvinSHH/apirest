//src/routes/recuperacionContrasenia.routes.js

import { Router } from "express";
import { methods as recuperarController } from "../controller/recuperar.controller";

const router = Router();

router.post("/verificarCorreo", recuperarController.verificarCorreo);

export default router;
