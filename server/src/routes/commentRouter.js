import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addComment, listComments, editComment, removeComment } from '../controllers/commentController.js';
import { validateCreateComment, validateUpdateComment } from '../middleware/commentValidation.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';


const router = express.Router();

router.get("/posts/:postId/comments", listComments);

router.post("/posts/:postId/comments", protect, validateCreateComment, handleValidationErrors, addComment);

router.patch("/comments/:commentId", protect, validateUpdateComment, handleValidationErrors, editComment);

router.delete("/comments/:commentId", protect, removeComment);

export default router;