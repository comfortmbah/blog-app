import express from 'express';
import { bookmarkPost, unbookmarkPost, hasBookmarkedPost, getMyBookmarkedPosts } from '../controllers/bookmarkController';
import { protect } from '../middleware/authMiddleware.js';
import { validatePostId } from '../middleware/bookmarkValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';


const router = express.Router();

router.get("/users/me/bookmarks", protect, getMyBookmarkedPosts);

router.get("/posts/:postId/bookmarks/me", protect, validatePostId, handleValidationErrors, hasBookmarkedPost);

router.post("/posts/:postId/bookmarks", protect, validatePostId, handleValidationErrors, bookmarkPost);

router.delete("/posts/:postId/bookmarks", protect, validatePostId, handleValidationErrors, unbookmarkPost);

export default router;