import { Router } from "express";

import { findByUsername, updateAvatar, deleteAvatar, updateDescription, updatePassword, erase } from "../controllers/user.controller.js";
import { cache, validId, validUser } from "../middlewares/global.middlewares.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/:username", cache, validUser, findByUsername);
router.patch("/settings/avatar/:id", authMiddleware, validId, updateAvatar);
router.patch("/settings/delete-avatar/:id", authMiddleware, validId, deleteAvatar);
router.patch("/settings/description/:id", authMiddleware, validId, updateDescription);
router.patch("/settings/password/:id", authMiddleware, validId, updatePassword);
router.delete("/settings/:id", authMiddleware, validId, erase);

export default router;
