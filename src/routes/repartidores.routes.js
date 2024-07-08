//src/routes/repartidores.routes.js

import { Router } from "express";
import { methods as lenguageController } from "../controller/repartidores.controller";

const router = Router();

router.get("/", lenguageController.getRepartidores);
router.get("/:idrepartidor", lenguageController.getRepartidor);
router.delete("/:idrepartidor", lenguageController.DeleteRepartidor);
router.post("/", lenguageController.addRepartidor);
router.put("/:idrepartidor", lenguageController.updateRepartidor);

export default router;
