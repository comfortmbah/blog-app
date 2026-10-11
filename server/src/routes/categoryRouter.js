import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';
import { getCategories, createCategoryController, updateCategoryController, deleteCategoryController } from '../controllers/categoryController.js';


const router = express.Router();

router.get("/", getCategories);

router.post("/", protect, requireAdmin, createCategoryController);

router.patch("/:id", protect, requireAdmin, updateCategoryController);

router.delete("/:id", protect, requireAdmin, deleteCategoryController);

export default router;