import express from "express";
import { getBlogs, createBlog, getBlogById, updateBlog } from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);

router.post("/", protect, createBlog);

router.get("/:id", getBlogById);

router.patch("/:id", protect, updateBlog);

export default router;