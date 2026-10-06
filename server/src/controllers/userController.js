import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from '../models/userModel.js';
import AppError from '../utils/AppError.js';


export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, passwordHash });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError("Email is already registered", 409);
    }

    next(error);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        issuer: "blog-api",
        audience: "blog-client",
      }
    );

    console.log("User logged in:", user.email);

    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}