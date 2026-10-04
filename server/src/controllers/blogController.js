import { getAllPosts, createPost, getPostById, updatePost, softDeletePost } from "../models/postModel.js";



export const getBlogs = async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (error) {
    next(error);
  }
}

export const createBlog = async (req, res) => {
  try {
    const { title, slug, content, published } = req.body;

    const post = await createPost({ userId: req.user.id, title, slug, content, published });

    res.status(201).json(post);
  } catch (error) {
    console.error("Failed to create a post:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Slug is already in use",
      });
    }

    res.status(500).json({
      message: "Failed to create post",
    });
  }
};


export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);

    res.status(500).json({
      message: "Failed to fetch post",
    });
  }
};


export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, published } = req.body;

    const existingPost = await getPostById(id);

    if (!existingPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (existingPost.user_id !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this post",
      })
    }

    const post = await updatePost({ id, title, slug, content, published });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Failed to update post:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Slug is already in use",
      });
    }

    res.status(500).json({
      message: "Failed to update post",
    });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existingPost = await getPostById(id);

    if (!existingPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (existingPost.user_id !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    const post = await softDeletePost(id);

    res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    console.error("Failed to delete post:", error);

    res.status(500).json({
      message: "Failed to delete post",
    });
  }
};