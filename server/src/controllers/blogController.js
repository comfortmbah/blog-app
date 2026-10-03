import { getAllPosts, createPost, createUser } from "../models/postModel.js";
import bcrypt from 'bcrypt';


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
    const { userId, title, slug, content, published } = req.body;

    const post = await createPost({ userId, title, slug, content, published });

    res.status(201).json(post);
  } catch (error) {
    console.error("Failed to create a post:", error);

    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, passwordHash });

    res.status(201).json(user);
  } catch (error) {
    console.error("Failed to register user:", error);

    res.status(500).json({
      message: "Failed to register user",
    });
  }
};


export const getBlogDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://dummyjson.com/posts/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
}