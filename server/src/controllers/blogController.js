import { getAllPosts, createPost, getPostById } from "../models/postModel.js";



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