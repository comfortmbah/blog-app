import express from 'express';
import { getTags, createTagController, updateTagController, deleteTagController } from '../controllers/tagController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';


const router = express.Router();

router.get("/", getTags);

router.post("/", protect, requireAdmin, createTagController);

router.patch("/:id", protect, requireAdmin, updateTagController);

router.delete("/:id", protect, requireAdmin, deleteTagController);

export default router;