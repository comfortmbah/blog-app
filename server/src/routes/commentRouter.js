import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addComment, listComments, editComment, removeComment } from '../controllers/commentController.js';


const router = express.Router();

router.get("/posts/:postId/comments", listComments);

router.post("/posts/:postId/comments", protect, addComment);

router.patch("/comments/:commentId", protect, editComment);

router.delete("/comments/:commentId", protect, removeComment);

export default router;