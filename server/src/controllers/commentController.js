import AppError from '../utils/AppError.js';
import { createComment,  getCommentsByPostId, getCommentById, updateComment, deleteComment,
  countCommentsByPostId
} from '../models/commentModel.js';
import { getPostById } from '../models/postModel.js';


export const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const post = await getPostById(postId);

    if (!post || !post.published || post.deleted_at !== null) {
      throw new AppError("Post not found", 404);
    } 

    const comment = await createComment({
      postId,
      userId: req.user.id,
      content,
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const listComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await getPostById(postId);

    if (!post || !post.published || post.deleted_at !== null) {
      throw new AppError("Post not found", 404);
    } 

    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 10));
    const offset = (page - 1) * limit;

    const [comments, totalComments] = await Promise.all([
      getCommentsByPostId({
        postId,
        limit,
        offset,
      }),
      countCommentsByPostId(postId),
    ]);

    const totalPages = Math.ceil(totalComments / limit);

    res.status(200).json({
      page,
      limit,
      totalComments,
      totalPages,
      comments,
    });
  } catch (error) {
    next(error);
  }
};


export const editComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (typeof content !== "string" || !content.trim()) {
      throw new AppError("Comment content is required", 400);
    }

    const comment = await getCommentById(commentId);

    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    const isCommentOwner = String(comment.user_id) === String(req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isCommentOwner && !isAdmin) {
      throw new AppError("You are not allowed to edit this comment", 403);
    }

    const updatedComment = await updateComment({
      id: commentId,
      content: content.trim(),
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};


export const removeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await getCommentById(commentId);

    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    const isCommentOwner = String(comment.user_id) === String(req.user.id);
    const isAdmin = req.user.role === 'admin';

    if (!isCommentOwner && !isAdmin) {
      throw new AppError("You are not allowed to delete this comment", 403);
    }

    await deleteComment(commentId);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};