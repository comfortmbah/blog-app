import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/userModel.js';


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


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
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
    console.error("Failed to login user:", error);

    res.status(500).json({
      message: "Failed to login user",
    });
  }
}