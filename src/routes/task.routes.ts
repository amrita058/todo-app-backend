import { Router } from "express";
import * as TaskController from "../controller/task.controller";
import { verifyJwt } from "../middleware/auth.middleware";
import { validateCreateTaskSchema } from "../middleware/validateTask.middleware";
import { validateObjectId } from "../middleware/validateObjectId.middleware";

const router = Router();

router.get("/", verifyJwt, TaskController.getAllTasks);
router.get("/:id", verifyJwt, validateObjectId, TaskController.getTaskById);
router.delete(
  "/:id",
  verifyJwt,
  validateObjectId,
  TaskController.deleteTaskById
);
router.put("/:id", verifyJwt, validateObjectId, TaskController.updataTaskById);
router.post(
  "/create",
  verifyJwt,
  validateCreateTaskSchema,
  TaskController.createTask
);

export default router;
