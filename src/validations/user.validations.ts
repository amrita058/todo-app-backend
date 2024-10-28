import { z } from "zod";

export const UserLoginSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Must be at least 3 character" })
    .max(15, { message: "Must be less than 15 character" })
    .refine((value) => value.trim() !== "", {
      message: "Space-only values are not allowed",
    }),
  password: z.string().min(1, { message: "Please enter valid password" }),
});

export const UserRegisterSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 character" })
    .max(15, { message: "Username must be less than 15 character" })
    .refine((value) => value.trim() !== "", {
      message: "Space-only values are not allowed",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   {
  //     message:
  //       "Must contain at least one uppercase, one lowercase, one number, and one special character",
  //   }
  // ),
  email: z.string().email("Please enter valid email").optional(),
});

export type IUserLoginParams = z.infer<typeof UserLoginSchema>;
export type IUserRegisterParams = z.infer<typeof UserRegisterSchema>;
