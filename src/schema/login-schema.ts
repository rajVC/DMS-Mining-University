import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(2, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(2, { message: "Password should have at least 2 characters" })
        .max(15, { message: "Password should not exceed 15 characters" }),
});

export type LoginData = z.infer<typeof loginSchema>;