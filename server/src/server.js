import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import memoryRouter from "./routes/memory.js";
import userRouter from "./routes/user.js";
import { connectDB } from "./db/index.js";
import { errorHandler, ErrorResponse } from "./utils/expressError.js";

function middleware(app) {
  app.use(express.json({ limit: "30mb", extended: true }));
  app.use(express.urlencoded({ limit: "30mb", extended: true }));
  app.use(cors());
  app.use(morgan("dev"));
}

const setupRoute = (app) => {
  app.get("/", (req, res) => {
    res.send("social media backend api");
  });

  app.use("/posts", memoryRouter);
  app.use("/user", userRouter);
  app.all("*", (req,res, next) => {
    next(new ErrorResponse("Page not found", 404));
  });

  app.use(errorHandler);
}

export const startServer = (readConfig) => {
  const app = express();

  connectDB(readConfig);

  middleware(app);

  setupRoute(app);
  return app;
};
