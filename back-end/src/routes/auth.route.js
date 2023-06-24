import { Router } from "express";
import { login, register, recovery, resetPassword } from "../controllers/auth.controller.js";
import { validId, validToken } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/sign-in", login);
router.post("/sign-up", register)
router.post("/recovery", recovery)
router.post("/reset-password/:id/:token", validId, validToken, resetPassword)

export default router;
