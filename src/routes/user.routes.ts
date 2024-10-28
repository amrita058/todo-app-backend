import { Router } from "express";
import * as UserController from "../controller/user.controller";

const router = Router();

router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);

export default router;
