import { getAllPosts, createPost, getPostById, updatePost, softDeletePost, getMyPosts, getPublishedPostById,
  getPostsByUserId,
  countPostsByUserId
} from "../models/postModel.js";
import AppError from "../utils/AppError.js";
import { findUserById } from "../models/userModel.js";



export const getBlogs = async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (error) {
    next(error);
  }
}

export const getMyBlogs = async (req, res, next) => {
  try {
    const posts = await getMyPosts(req.user.id);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, slug, content, published } = req.body;

    const post = await createPost({ userId: req.user.id, title, slug, content, published });

    res.status(201).json(post);
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError("Slug is already in use", 409);
    }
    
    next(error);
  }
};


export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await getPublishedPostById(id);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};


export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, content, published } = req.body;

    const existingPost = await getPostById(id);

    if (!existingPost) {
      throw new AppError("Post not found", 404);
    }

    if (existingPost.user_id !== req.user.id && req.user.role !== "admin") {
      throw new AppError("You are not allowed to update this post", 403);
    }

    const post = await updatePost({ id, title, slug, content, published });

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    res.status(200).json(post);
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError("Slug is already in use", 409);
    }

    next(error);
  }
};


export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingPost = await getPostById(id);

    if (!existingPost) {
      throw new AppError("Post not found", 404);
    }

    if (existingPost.user_id !== req.user.id && req.user.role !== "admin") {
      throw new AppError("You are not allowed to delete this post", 403);
    }

    const post = await softDeletePost(id);

    res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};


export const getUserBlogs = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    if (!Number.isInteger(page) || page < 1) {
      throw new AppError("Page must be a positive integer", 400);
    }

    if (page > 1000) {
      throw new AppError("Page must not exceed 1000", 400);
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new AppError("Limit must be between 1 and 100", 400);
    }

    const offset = (page - 1) * limit;

    const sort = req.query.sort || "newest";

    if (sort !== "newest" && sort !== "oldest") {
      throw new AppError("Sort must be either newest or oldest", 400);
    }

    const sortOrder = sort === "newest" ? "DESC" : "ASC";

    const sortBy = req.query.sortBy || "created_at";

    const allowedSortFields = {
      created_at: "created_at",
      title: "title",
    };

    if (!allowedSortFields[sortBy]) {
      throw new AppError("sortBy must be either created_at or title", 400);
    }

    const sortColumn = allowedSortFields[sortBy];

    const search = req.query.search ? req.query.search.trim() : "";

    if (search.length > 100) {
      throw new AppError("Search must not exceed 100 characters", 400);
    }

    const status = req.query.status || "all";

    if (
      status !== "all" &&
      status !== "published" &&
      status !== "draft"
    ) {
      throw new AppError("Status must be all, published, or draft", 400);
    }

    const posts = await getPostsByUserId(userId, { limit, offset, sortOrder, sortBy: sortColumn, search, status, });

    const total = await countPostsByUserId(userId, search, status);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    if (page > totalPages) {
      throw new AppError(`Page ${page} does not exist`, 404);
    }

    const baseUrl = `/api/blogs/user/${userId}`;

    const createPageUrl = (targetPage) => {
      const params = new URLSearchParams({
        page: targetPage,
        limit,
        sort,
        sortBy,
        status,
      });

      if (search) {
        params.set("search", search);
      }

      return `${baseUrl}?${params.toString()}`;
    };

    res.status(200).json({
      page, 
      limit,
      count: posts.length,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      links: {
        first: createPageUrl(1),
        previous: page > 1 ? createPageUrl(page - 1) : null,
        self: createPageUrl(page),
        next: page < totalPages ? createPageUrl(page + 1) : null,
        last: createPageUrl(totalPages),
      },
      sortBy,
      sort,
      search,
      status,
      posts,
    });
  } catch (error) {
    next(error);
  }
}


