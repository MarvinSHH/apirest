//src/routes/historial.routes.js
import { Router } from "express";
import { methods as historialController } from "../controller/historial.controller";
import verifyToken from "../middleware/auth.middleware";

const router = Router();
router.get("/pdf", verifyToken, historialController.getHistorial);

export default router;
