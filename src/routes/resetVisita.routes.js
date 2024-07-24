import { Router } from "express";
import { methods as lenguageControllerss } from "../controller/resetVisita.controller";
import verifyToken from "../middleware/auth.middleware";

const router = Router();
router.put("/resetVisitado", lenguageControllerss.resetVisitado);
export default router;
