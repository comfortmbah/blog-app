import { getAllPosts, createPost, getPostById, updatePost, softDeletePost } from "../models/postModel.js";
import AppError from "../utils/AppError.js";



export const getBlogs = async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (error) {
    next(error);
  }
}

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

    const post = await getPostById(id);

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

    if (existingPost.user_id !== req.user.id) {
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

    if (existingPost.user_id !== req.user.id) {
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