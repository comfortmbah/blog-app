import { body } from "express-validator";

export const validateCreatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),
  
  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required")
    .isLength({ max: 280 })
    .withMessage("Slug must not exceed 280 characters"),
 
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
]