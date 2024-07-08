import { Router } from "express";
import { getUserData, updateUserData } from "../controller/user.controller";
import verifyToken from "../middleware/auth.middleware";

const router = Router();

router.get("/:type/:id", verifyToken, getUserData);
router.put("/:type/:id", verifyToken, updateUserData);

export default router;
