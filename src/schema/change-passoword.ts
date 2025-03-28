import { z } from "zod";

export const changePassowrdSchema = z.object({
    email: z
        .string()
        .min(2, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    new_password: z
        .string()
        .min(2, { message: "Password should have at least 2 characters" })
        .max(15, { message: "Password should not exceed 15 characters" }),
    old_password: z
        .string()
        .min(2, { message: "Password should have at least 2 characters" })
        .max(15, { message: "Password should not exceed 15 characters" }),
});

export type changePasswordData = z.infer<typeof changePassowrdSchema>;