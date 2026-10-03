import express from "express";
import { getBlogs, createBlog, registerUser, getBlogDetails } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);

router.post("/", createBlog);

router.post("/register", registerUser);

router.get("/:id", getBlogDetails);

export default router;