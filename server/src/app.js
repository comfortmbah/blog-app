import helmet from "helmet";
import express from "express";
import cors from "cors";
import blogRouter from "./routes/blogRouter.js"
import healthRouter from "./routes/healthRouter.js";
import userRouter from './routes/userRouter.js';
import { errorHandler } from "./middleware/errorMiddleware.js";
import AppError from "./utils/AppError.js";
import categoryRouter from './routes/categoryRouter.js';
import tagRouter from './routes/tagRouter.js';
import commentRouter from './routes/commentRouter.js'
import likeRouter from './routes/likeRouter.js';
import bookmarkRouter from './routes/bookmarkRouter.js';


const app = express();

app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === process.env.CLIENT_URL) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "1mb" }));

app.use("/api/health", healthRouter);

app.use("/api/users", userRouter);

app.use("/api/blogs", blogRouter);

app.use("/api/categories", categoryRouter);

app.use("/api/tags", tagRouter);

app.use("/api", commentRouter);

app.use("/api", likeRouter);

app.use("/api", bookmarkRouter);

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;