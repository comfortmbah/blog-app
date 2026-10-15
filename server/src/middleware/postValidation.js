import { body } from "express-validator";

export const validateCreatePost = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),
  
  body("slug")
    .isString()
    .withMessage("Slug must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Slug is required")
    .isLength({ max: 280 })
    .withMessage("Slug must not exceed 280 characters")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Slug can only contain lowercase letters, numbers, and hyphens"),
 
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Content is required"),
  
  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),

  body("categoryIds")
    .optional()
    .isArray({ max: 20 })
    .withMessage("Category IDs must be an array with no more than 20 items"),

  body("categoryIds.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each category ID must be a positive integer"),

  body("categoryIds")
    .optional()
    .custom((categoryIds) => {
      const normalizedIds = categoryIds.map(Number);

      if (new Set(normalizedIds).size !== normalizedIds.length) {
        throw new Error("Duplicate category IDs are not allowed")
      }

      return true;
    }),

  body("tagIds")
    .optional()
    .isArray({ max: 30 })
    .withMessage("Tag IDs must be an array with no more than 30 items"),

  body("tagIds.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each tag ID must be a positive integer"),

  body("tagIds")
    .optional()
    .custom((tagIds) => {
      const normalizedIds = tagIds.map(Number);

      if (new Set(normalizedIds).size !== normalizedIds.length) {
        throw new Error("Duplicate tag IDs are not allowed")
      }

      return true;
    }),
]

export const validateUpdatePost = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Title must not exceed 255 characters"),

  body("slug")
    .optional()
    .isString()
    .withMessage("Slug must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Slug cannot be empty")
    .isLength({ max: 280 })
    .withMessage("Slug must not exceed 280 characters")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Slug can only contain lowercase letters, numbers, and hyphens"),

  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty"), 

  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),
  
  body("categoryIds")
    .optional()
    .isArray({ max: 20 })
    .withMessage("Category IDs must be an array with no more than 20 items"),

  body("categoryIds.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each category ID must be a positive integer"),

  body("categoryIds")
    .optional()
    .custom((categoryIds) => {
      const normalizedIds = categoryIds.map(Number);

      if (new Set(normalizedIds).size !== normalizedIds.length) {
        throw new Error("Duplicate category IDs are not allowed")
      }

      return true;
    }),

  body("tagIds")
    .optional()
    .isArray({ max: 30 })
    .withMessage("Tag IDs must be an array with no more than 30 items"),

  body("tagIds.*")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Each tag ID must be a positive integer"),

  body("tagIds")
    .optional()
    .custom((tagIds) => {
      const normalizedIds = tagIds.map(Number);

      if (new Set(normalizedIds).size !== normalizedIds.length) {
        throw new Error("Duplicate tag IDs are not allowed")
      }

      return true;
    }),
];