import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { validateRegisterUser, validateLoginUser } from '../middleware/userValidation.js';
import { loginRateLimit, registerRateLimit } from '../middleware/authRateLimit.js';

const router = express.Router();

router.post("/register", registerRateLimit, validateRegisterUser, handleValidationErrors, registerUser);

router.post("/login", loginRateLimit, validateLoginUser, handleValidationErrors, loginUser);

export default router;