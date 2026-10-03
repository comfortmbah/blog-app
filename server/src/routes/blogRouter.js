import express from "express";
import { getBlogs, createBlog, getBlogDetails } from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);

router.post("/", protect, createBlog);

router.get("/:id", getBlogDetails);

export default router;