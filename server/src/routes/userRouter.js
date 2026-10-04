import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import { validateRegisterUser } from '../middleware/userValidation.js';

const router = express.Router();

router.post("/register", validateRegisterUser, handleValidationErrors, registerUser);

router.post("/login", loginUser);

export default router;