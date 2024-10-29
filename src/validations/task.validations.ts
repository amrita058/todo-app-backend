import { z } from "zod";

export const createTaskValidation = z.object({
  taskName: z.string().min(1).max(100),
  taskDescription: z.string().min(1).max(100),
  taskStatus: z.enum(["pending", "in_progress", "completed"]),
});

export type ICreateTaskParams = z.infer<typeof createTaskValidation>;
