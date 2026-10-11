import { getAllTags } from '../models/tagModel.js';


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