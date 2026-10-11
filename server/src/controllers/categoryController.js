import { getAllCategories } from "../models/categoryModel.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories,
      },
    })
  } catch (error) {
    next(error);
  }
};