//src/routes/cron.routes.js
import { Router } from "express";
import { methods as ControllerCron } from "../controller/cron.controller";

const router = Router();

router.get("/reset-daily", ControllerCron.resetDailyData);

export default router;
