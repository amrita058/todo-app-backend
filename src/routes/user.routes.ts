import { Router } from "express";
import * as UserController from "../controller/user.controller";
import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../middleware/validateUser.middleware";

const router = Router();

router.post("/login", validateLoginSchema, UserController.loginUser);
router.post("/register", validateRegisterSchema, UserController.registerUser);

export default router;
