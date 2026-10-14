import { createLike, removeLike, countLikesByPostId, hasUserLikedPost,
  getLikedPostsByUserId, countLikedPostsByUserId
} from '../models/likeModel.js';
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


export const getMyLikedPosts = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const offset = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      getLikedPostsByUserId(userId, { limit, offset }),
      countLikedPostsByUserId(userId),
    ]);

    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      page,
      limit,
      totalPosts,
      totalPages,
      posts,
    });
  } catch (error) {
    return next(error);
  }
};


