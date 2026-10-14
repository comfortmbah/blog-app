import express from 'express';
import { likePost, unlikePost, getPostLikes, checkPostLike, getMyLikedPosts } from '../controllers/likeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validatePostId } from '../middleware/likeValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';


const router = express.Router();

router.get("/users/me/likes", protect, getMyLikedPosts);

router.get("/posts/:postId/likes", validatePostId, handleValidationErrors, getPostLikes);

router.get("/posts/:postId/likes/me", protect, validatePostId, handleValidationErrors, checkPostLike);

router.post("/posts/:postId/likes", protect, validatePostId, handleValidationErrors, likePost);

router.delete("/posts/:postId/likes", protect, validatePostId, handleValidationErrors, unlikePost);

export default router;