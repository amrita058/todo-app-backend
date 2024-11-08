import { isValid, parse } from "date-fns";
import { z } from "zod";

export const createTaskValidation = z.object({
  taskName: z
    .string({ message: "taskName is required" })
    .min(1, { message: "taskName needs to be at least 1 character" })
    .max(100, { message: "taskName needs to be at most 100 characters" }),
  taskDescription: z
    .string({ message: "taskDescription is required" })
    .min(1, { message: "taskDescription needs to be at least 1 character" })
    .max(100, {
      message: "taskDescription needs to be at most 100 characters",
    }),
  taskStatus: z.enum(["pending", "in_progress", "completed"]),
  expiresAt: z
    .string({ message: "expiresAt is required" })
    .refine(
      (value) => {
        const parsedDate = parse(value, "yyyy-MM-dd", new Date());
        return isValid(parsedDate);
      },
      {
        message: "Invalid date. Date must be yyyy-MM-dd format",
      }
    )
    .refine(
      (value) => {
        const parsedDate = parse(value, "yyyy-MM-dd", new Date());
        return parsedDate >= new Date();
      },
      { message: "expiresAt must be a future date" }
    ),
});

export type ICreateTaskParams = z.infer<typeof createTaskValidation>;
