import express from "express";
import { getBlogs, getBlogDetails } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);

router.get("/:id", getBlogDetails)

export default router;