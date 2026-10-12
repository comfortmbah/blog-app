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
    .withMessage("Slug must not exceed 280 characters")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Slug can only contain lowercase letters, numbers, and hyphens"),
 
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required"),
  
  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),

  body("categoryIds")
    .optional()
    .isArray()
    .withMessage("Category IDs must be an array"),

  body("categoryIds.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each category ID must be a positive integer"),

  body("categoryIds")
    .optional()
    .custom((categoryIds) => {
      if (new Set(categoryIds).size !== categoryIds.length) {
        throw new Error("Duplicate category IDs are not allowed")
      }

      return true;
    }),

  body("tagIds")
    .optional()
    .isArray()
    .withMessage("Tag IDs must be an array"),

  body("tagIds.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each tag ID must be a positive integer"),

  body("tagIds")
    .optional()
    .custom((tagIds) => {
      if (new Set(tagIds).size !== tagIds.length) {
        throw new Error("Duplicate tag IDs are not allowed")
      }

      return true;
    }),
]

export const validateUpdatePost = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),

  body("slug")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Slug cannot be empty")
    .isLength({ max: 280 })
    .withMessage("Slug must not exceed 280 characters")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Slug can only contain lowercase letters, numbers, and hyphens"),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty"), 

  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),
  
  body("categoryIds")
    .optional()
    .isArray()
    .withMessage("Category IDs must be an array"),

  body("categoryIds.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each category ID must be a positive integer"),

  body("categoryIds")
    .optional()
    .custom((categoryIds) => {
      if (new Set(categoryIds).size !== categoryIds.length) {
        throw new Error("Duplicate category IDs are not allowed")
      }

      return true;
    }),

  body("tagIds")
    .optional()
    .isArray()
    .withMessage("Tag IDs must be an array"),

  body("tagIds.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each tag ID must be a positive integer"),

  body("tagIds")
    .optional()
    .custom((tagIds) => {
      if (new Set(tagIds).size !== tagIds.length) {
        throw new Error("Duplicate tag IDs are not allowed")
      }

      return true;
    }),
];