import { Router } from "express";

import { findByUsername, updateDescription, updatePassword, erase } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/:username", validUser, findByUsername);
router.patch("/settings/description/:id", authMiddleware, validId, updateDescription);
router.patch("/settings/password/:id", authMiddleware, validId, updatePassword);
router.delete("/settings/:id", authMiddleware, validId, erase);

export default router;
