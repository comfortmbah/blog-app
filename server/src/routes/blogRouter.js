import express from "express";
import { getBlogList } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogList);

export default router;