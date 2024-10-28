import { env } from "@/config/env.config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  //   const fe_token = req.headers.authorization;
  const token = authHeader ? authHeader : null;
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }
  jwt.verify(token, env.SECRET_KEY as string, (err: any, decoded: any) => {
    if (err) return res.status(403).json("Unauthorized");
    res.locals.userData = decoded;
    next(); //can directly send user as argument to next
  });
};
