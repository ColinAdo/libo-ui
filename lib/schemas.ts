import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, {
    message: "username is required",
  }),
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
  re_password: z.string().min(1, {
    message: "confirm password is required",
  }),
});

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

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email({
      message: "Enter a valid email address",
    }),
});

export const resetPasswordConfirmSchema = z.object({
  new_password: z.string().min(1, {
    message: "new password is required",
  }),
  re_new_password: z.string().min(1, {
    message: "confirm new password is required",
  }),
});

export const UploadBookSchema = z.object({
  category: z.string().min(1, "Please select a category."),
  author: z.string().min(1, "Author name is required."),
  title: z.string().min(1, "Book title is required."),
  cover_image: z.string().min(1, "Book cover image is required."),
  pdf_file: z.string().url("Invalid file URL").min(1, "Book PDF file is required."),
  description: z.string().min(1, "Book description is required."),
});
