import express from "express";
import { getBlogs, createBlog, getBlogDetails } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);

router.post("/", createBlog);

router.get("/:id", getBlogDetails);

export default router;