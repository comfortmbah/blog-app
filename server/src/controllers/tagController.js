import { getAllTags, createTag, updateTag, deleteTag } from '../models/tagModel.js';
import AppError from '../utils/AppError.js';


export const getTags = async (req, res, next) => {
  try {
    const tags = await getAllTags();

    res.status(200).json({
      status: 'success',
      results: tags.length,
      data: {
        tags,
      },
    })
  } catch (error) {
    next(error);
  }
};


export const createTagController = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    const tag = await createTag({ name, slug });

    res.status(200).json({
      status: "success",
      data: {
        tag,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const updateTagController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const tag = await updateTag(id, { name, slug });

    if (!tag) {
      return next(new AppError("Tag not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        tag,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTagController = async (id) => {
  try {
    const { id } = req.params;

    const tag = await deleteTag(id);

    if (!tag) {
      return next(new AppError("Tag not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Tag deleted successfully",
      data: {
        tag,
      },
    });
  } catch (error) {
    next(error);
  }
}
