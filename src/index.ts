// src/index.ts
import express, { Express } from "express";
import {
  initialiseMiddleware,
  initializeErrorHandler,
  initializeRoutes,
} from "./app";
import { env } from "./config/env.config";
import { connectDB } from "./database/database";

const app: Express = express();
const port = env.PORT || 3000;

initialiseMiddleware(app);

connectDB();

initializeRoutes(app);

initializeErrorHandler(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
