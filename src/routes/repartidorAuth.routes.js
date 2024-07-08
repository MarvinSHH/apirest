//src/routes/repartidorAuth.routes.js
import { Router } from "express";
import { methods as repartidorAuthController } from "../controller/repartidorAuth.controller";

const router = Router();

router.post("/register", repartidorAuthController.registerRepartidor);

export default router;
