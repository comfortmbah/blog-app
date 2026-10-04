import express from "express";
import { getBlogs, createBlog, getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateCreatePost } from "../middleware/postValidation.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);

router.post("/", protect, validateCreatePost, handleValidationErrors, createBlog);

router.get("/:id", getBlogById);

router.patch("/:id", protect, updateBlog);

router.delete("/:id", protect, deleteBlog);

export default router;