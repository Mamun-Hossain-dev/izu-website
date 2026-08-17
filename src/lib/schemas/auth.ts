import { z } from "zod";

export const emailSchema = z.email("Enter a valid email address.");

export const passwordSchema = z
  .string()
  .min(1, "Password is required.")
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Must include an uppercase letter.")
  .regex(/[a-z]/, "Must include a lowercase letter.")
  .regex(/\d/, "Must include a number.")
  .regex(/[^A-Za-z0-9]/, "Must include a special character.")
  .refine((value) => !/\s/.test(value), "No spaces allowed.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required."),
    email: emailSchema,
    phone: z.string().min(1, "Phone number is required."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
    accountType: z.enum(["user", "provider"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type SignUpValues = z.infer<typeof signupSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
