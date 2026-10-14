import express from 'express';
import { bookmarkPost, unbookmarkPost, hasBookmarkedPost, getMyBookmarkedPosts } from '../controllers/bookmarkController';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get("/users/me/bookmarks", protect, getMyBookmarkedPosts);

router.get("/posts/:postId/bookmarks/me", protect, hasBookmarkedPost);

router.post("/posts/:postId/bookmarks", protect, bookmarkPost);

router.delete("/posts/:postId/bookmarks", protect, unbookmarkPost);

export default router;