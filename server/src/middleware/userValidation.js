import { body } from "express-validator";

export const validateRegisterUser = [
  body().custom((_, { req }) => {
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body)
    ) {
      throw new Error("Request body must be a JSON object");
    }

    const allowedFields = ["name", "email", "password"];

    const unexpectedFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );

    if (unexpectedFields.length > 0) {
      throw new Error(
        `Unexpected registration field(s): ${unexpectedFields.join(", ")}`
      );
    }

    return true;
  }),

  body("name")
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters"),

  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please, provide a valid email address"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .bail()
    .custom((password) => {
      if (Buffer.byteLength(password, "utf8") > 72) {
        throw new Error("Password must not exceed 72 UTF-8 bytes");
      }

      return true;
    }),
];

export const validateLoginUser = [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please, provide a valid email address"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .custom((password) => {
      if (Buffer.byteLength(password, "utf8") > 72) {
        throw new Error("Invalid email or password");
      }

      return true;
    }),
];