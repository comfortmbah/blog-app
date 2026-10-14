import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { validateRegisterUser, validateLoginUser } from '../middleware/userValidation.js';
import { authRateLimit } from '../middleware/authRateLimit.js';

const router = express.Router();

router.post("/register", authRateLimit, validateRegisterUser, handleValidationErrors, registerUser);

router.post("/login", authRateLimit, validateLoginUser, handleValidationErrors, loginUser);

export default router;