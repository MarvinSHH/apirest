//src/routes/auth.routes.js

import { Router } from "express";
import { methods as authController } from "../controller/auth.controller";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register); //registra administradores

export default router;
