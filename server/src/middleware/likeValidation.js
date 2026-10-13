import { param } from 'express-validator';


export const validatePostId = [
  param("postId")
    .isInt({ min: 1 })
    .withMessage("Post ID must be a positive integer")
];