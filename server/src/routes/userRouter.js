import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { validateRegisterUser, validateLoginUser, validateForgotPassword } from '../middleware/userValidation.js';
import { loginRateLimit, registerRateLimit } from '../middleware/authRateLimit.js';
import { forgotPassword } from '../controllers/passwordResetController.js';

const router = express.Router();

router.post("/register", registerRateLimit, validateRegisterUser, handleValidationErrors, registerUser);

router.post("/login", loginRateLimit, validateLoginUser, handleValidationErrors, loginUser);

router.post("/forgot-password", validateForgotPassword, handleValidationErrors, forgotPassword);

export default router;