// src/index.ts
import express, { Express } from "express";
import {
  initialiseMiddleware,
  initializeErrorHandler,
  initializeRoutes,
} from "./config/express.config";
import { env } from "./config/env.config";
import { connectDB } from "./config/database.config";

//version as 0.0.1

const app: Express = express();
const port = env.PORT || 3000;

initialiseMiddleware(app);

connectDB();

initializeRoutes(app);

initializeErrorHandler(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
