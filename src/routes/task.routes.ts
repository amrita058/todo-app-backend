import { Router } from "express";
import * as TaskController from "../controller/task.controller";
import { verifyJwt } from "../middleware/auth.middleware";

const router = Router();

router.get("/", verifyJwt, TaskController.getAllTasks);
router.get("/:id", verifyJwt, TaskController.getTaskById);
router.delete("/:id", verifyJwt, TaskController.deleteTaskById);
router.put("/:id", verifyJwt, TaskController.updataTaskById);
router.post("/create", verifyJwt, TaskController.createTask);

export default router;
