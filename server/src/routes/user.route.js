import { Router } from "express";

import { findByUsername, updateAvatar, deleteAvatar, updateDescription, updatePassword, erase } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/:username", validUser, findByUsername);
router.patch("/settings/avatar/:id/:username", authMiddleware, validId, updateAvatar);
router.patch("/settings/delete-avatar/:id/:username", authMiddleware, validId, deleteAvatar);
router.patch("/settings/description/:id/:username", authMiddleware, validId, updateDescription);
router.patch("/settings/password/:id/:username", authMiddleware, validId, updatePassword);
router.delete("/settings/:id/:username", authMiddleware, validId, erase);

export default router;
