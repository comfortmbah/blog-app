import { createLike, removeLike, countLikesByPostId, hasUserLikedPost } from '../models/likeModel.js';
import AppError from '../utils/AppError.js';
import { getPublishedPostById } from '../models/postModel.js';


export const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await getPublishedPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const like = await createLike({ userId, postId });

    res.status(201).json({
      message: "Post liked successfully",
      like,
    });
  } catch(error) {
    if (error.code === '23505') {
      return next(new AppError("You already liked this post", 409));
    }

    return next(error);
  }
};


export const unlikePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await getPublishedPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const like = await removeLike({ userId, postId });

    if (!like) {
      throw new AppError("You have not liked this post", 404);
    }

    res.status(200).json({
      message: "Post unliked successfully",
    });
  } catch (error) {
    return next(error);
  }
};


export const getPostLikes = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await getPublishedPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const totalLikes = await countLikesByPostId(postId);

    res.status(200).json({
      postId: Number(postId),
      totalLikes,
    });
  } catch (error) {
    return next(error);
  }
};


export const checkPostLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await getPublishedPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const liked = await hasUserLikedPost({ userId, postId });

    res.status(200).json({
      postId: Number(postId),
      liked,
    });
  } catch (error) {
    return next(error);
  }
};


