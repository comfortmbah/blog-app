import express from "express";
import cors from "cors";
import blogRouter from "./routes/blogRouter.js"
import healthRouter from "./routes/healthRouter.js";
import userRouter from './routes/userRouter.js';
import { errorHandler } from "./middleware/errorMiddleware.js";
import AppError from "./utils/AppError.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/health", healthRouter);

app.use("/api/users", userRouter);

app.use("/api/blogs", blogRouter);

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;