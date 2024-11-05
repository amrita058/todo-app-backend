import express, { Express, NextFunction, Request, Response } from "express";
import routes from "./routes/index.routes";
import { ErrorHandler } from "./error/error";
import { errorMiddleware } from "./middleware/error.middleware";
import cors from "cors";
import morgan from "morgan";

//use in config express
//url encoded or json which one to use
//middleware for data validation do not allow to come to controller as well
//es lint for this project
//make model as entites

export const initialiseMiddleware = (app: Express) => {
  app.use(cors({ origin: "*" }));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

export const initializeRoutes = (app: Express) => {
  //health check api use /health also add timestamp
  app.get("/", (req: Request, res: Response) => {
    res.send("Api is running");
  });

  app.use("/api/v1", routes);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const error = new ErrorHandler("Path not found", 404);
    error.name = "Not found";
    throw error;
  });
};

export const initializeErrorHandler = (app: Express) => {
  app.use(errorMiddleware);
};
