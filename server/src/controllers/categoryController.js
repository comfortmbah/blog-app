import { getAllCategories, createCategory, updateCategory, deleteCategory } from "../models/categoryModel.js";
import AppError from "../utils/AppError.js";


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

export const createCategoryController = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    const category = await createCategory({ name, slug });

    res.status(201).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const category = await updateCategory(id, { name, slug });

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
}

export const deleteCategoryController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category  = await deleteCategory(id);

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
      data: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};