// src/index.ts
import express, { Express, NextFunction, Request, Response } from "express";
import { connectDB } from "./database/database";
import { env } from "./config/env.config";
import routes from "./routes/index.routes";
import { ErrorHandler } from "./utils/error";
import { errorMiddleware } from "./middleware/error.middleware";

const app: Express = express();
const port = env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Api is running");
});

app.use("/api/v1", routes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorHandler("Path not found", 404);
  error.name = "Not found";
  throw error;
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
