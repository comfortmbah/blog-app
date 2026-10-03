import express from "express";
import cors from "cors";
import blogRouter from "./routes/blogRouter.js"
import healthRouter from "./routes/healthRouter.js";
import userRouter from './routes/userRouter.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/health", healthRouter);

app.use("/api/users", userRouter);

app.use("/api/blogs", blogRouter);

export default app;