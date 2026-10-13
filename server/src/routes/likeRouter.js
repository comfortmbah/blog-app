import express from 'express';
import { likePost, unlikePost, getPostLikes, checkPostLike } from '../controllers/likeController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get("/posts/:postId/likes", getPostLikes);

router.get("/posts/:postId/likes/me", protect, checkPostLike);

router.post("/posts/:postId/likes", protect, likePost);

router.delete("/posts/:postId/likes", protect, unlikePost);

export default router;