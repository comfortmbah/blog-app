import { body } from "express-validator";

// Validate comment creation
export const validateCreateComment = [
  body("content")
    .isString()
    .withMessage("Comment content must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ max: 2000 })
    .withMessage("Comment must not exceed 2000 characters"),
];

// Validate comment updates
export const validateUpdateComment = [
  body("content")
    .isString()
    .withMessage("Comment content must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Comment content cannot be empty")
    .isLength({ max: 2000 })
    .withMessage("Comment must not exceed 2000 characters"),
];