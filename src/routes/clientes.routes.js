//src/routes/clientes.routes.js

import { Router } from "express";
import { methods as lenguageController } from "../controller/clientes.controller";
import verifyToken from "../middleware/auth.middleware";

const router = Router();

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
router.get(
  "/repartidores",
  verifyToken,
  lenguageController.obtenerRepartidoresConClientes
);

export default router;
