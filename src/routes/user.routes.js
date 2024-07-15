// src/routes/user.routes.js
import { Router } from "express";
import { getUserData, updateUserData } from "../controller/user.controller";
import verifyToken from "../middleware/auth.middleware";

const router = Router();

router.get("/:id", verifyToken, getUserData);
router.put("/:id", verifyToken, updateUserData);

export default router;
