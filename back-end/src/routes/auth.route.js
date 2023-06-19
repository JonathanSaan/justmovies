import { Router } from "express";
import { login, register, recovery, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sign-in", login);
router.post("/sign-up", register)
router.post("/recovery", recovery)
router.post("/reset-password/:id/:token", resetPassword)

export default router;
