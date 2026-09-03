import express from "express";
import { getBlogList, getBlogDetails } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogList);

router.get("/:id", getBlogDetails)

export default router;