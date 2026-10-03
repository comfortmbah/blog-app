import bcrypt from 'bcrypt';
import { createUser } from '../models/postModel.js';


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, passwordHash });

    res.status(201).json(user);
  } catch (error) {
    console.error("Failed to register user:", error);

    res.status(500).json({
      message: "Failed to register user",
    });
  }
};