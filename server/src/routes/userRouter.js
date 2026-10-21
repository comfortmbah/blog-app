import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { validateRegisterUser, validateLoginUser, validateForgotPassword, validateResetPassword } from '../middleware/userValidation.js';
import { loginRateLimit, registerRateLimit, forgotPasswordRateLimit } from '../middleware/authRateLimit.js';
import { forgotPassword, resetPassword } from '../controllers/passwordResetController.js';

const router = express.Router();

router.post("/register", registerRateLimit, validateRegisterUser, handleValidationErrors, registerUser);

router.post("/login", loginRateLimit, validateLoginUser, handleValidationErrors, loginUser);

router.post("/forgot-password", forgotPasswordRateLimit, validateForgotPassword, handleValidationErrors, forgotPassword);

router.post("/reset-password", validateResetPassword, handleValidationErrors, resetPassword);

export default router;