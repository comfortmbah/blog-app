import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addComment, listComments } from '../controllers/commentController.js';


const router = express.Router();

router.get("/posts/:postId/comments", listComments);

router.post("/posts/:postId/comments", protect, addComment);

export default router;