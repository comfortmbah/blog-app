import AppError from '../utils/AppError.js';
import { createComment,  getCommentsByPostId } from '../models/commentModel.js';
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

    const comments = await getCommentsByPostId({
      postId,
      limit,
      offset,
    });

    res.status(200).json({
      page,
      limit,
      comments,
    });
  } catch (error) {
    next(error);
  }
};