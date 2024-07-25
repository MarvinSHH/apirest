//src/routes/clientes.routes.js

import { Router } from "express";
import { methods as lenguageController } from "../controller/visitad.controller";
import verifyToken from "../middleware/auth.middleware";

const router = Router();
router.put("/resetVisitado", verifyToken, lenguageController.resetVisitado);
export default router;
