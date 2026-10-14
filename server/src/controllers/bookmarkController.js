import AppError from '../utils/AppError.js';
import { getPublishedPostById } from '../models/postModel.js';
import { createBookmark, removeBookmark, hasUserBookmarkedPost, getBookmarkedPostsByUserId,
    countBookmarkedPostsByUserId
 } from '../models/bookmarkModel.js';



export const bookmarkPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await getPublishedPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const bookmark = await createBookmark({ postId, userId });

    res.status(200).json({
      message: "Post bookmarked successfully",
      bookmark,
    });
  } catch (error) {
    if (error.code === '23505') {
      return next(new AppError("You have already bookmarked this post", 409));
    }

    return next(error);
  }
};


export const unbookmarkPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await getPublishedPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const bookmark = await removeBookmark({ postId, userId });

    if (!bookmark) {
      throw new AppError("You have not bookmarked this post", 404);
    }

    res.status(200).json({
      message: "Bookmark removed successfully",
    });
  } catch (error) {
    return next(error);
  }
};



export const hasBookmarkedPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await getPublishedPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const bookmarked = await hasUserBookmarkedPost({ postId, userId });

    res.status(200).json({
      postId: Number(postId),
      bookmarked,
    });
  } catch (error) {
    return next(error);
  }
};


export const getMyBookmarkedPosts = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const offset = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      getBookmarkedPostsByUserId(userId, { limit, offset }),
      countBookmarkedPostsByUserId(userId),
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