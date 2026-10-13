import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addComment, listComments, editComment } from '../controllers/commentController.js';


const router = express.Router();

router.get("/posts/:postId/comments", listComments);

router.post("/posts/:postId/comments", protect, addComment);

router.patch("/comments/:commentId", protect, editComment);

export default router;