import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({
      message: "Enter a valid email address",
    }),
  password: z.string().min(1, {
    message: "password is required",
  }),
});
