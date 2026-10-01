import { getAllPosts } from "../models/postModel.js";


export const getBlogs = async (req, res, next) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (error) {
    next(error);
  }
}


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