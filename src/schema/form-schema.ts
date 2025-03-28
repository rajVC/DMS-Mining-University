import { FIELD_PARAMS } from "@/constant/params";
import { z } from "zod";

export const coreFormSchema = z
  .object({
    email: z
      .string()
      .min(2, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    contact: z
      .string()
      .min(10, { message: "Contact must be at least 10 characters" }) // Ensure at least 5 characters
      .superRefine((val, ctx) => {
        const num = Number(val);
        if (isNaN(num)) {
          ctx.addIssue({
            code: "custom",
            message: "Must be a valid number",
          });
        } else if (!Number.isInteger(num)) {
          ctx.addIssue({
            code: "custom",
            message: "Must be an integer",
          });
        }
      }),
    [FIELD_PARAMS.UNIVERSITY_NAME]: z
      .string()
      .min(1, { message: "University name is required" }),
    [FIELD_PARAMS.ROLE_ID]: z
      .string()
      .min(1, { message: "ID is required" })
      .max(8, { message: "ID cannot exceed 8 characters" }),
    [FIELD_PARAMS.FIRST_NAME]: z
      .string()
      .min(1, { message: "First name is required" }),
    [FIELD_PARAMS.LAST_NAME]: z
      .string()
      .min(1, { message: "Last name is required" }),
    password: z
      .string()
      .min(2, { message: "should have at least 2 characters" })
      .max(15, { message: "should not exceed 15 characters" }),
    address: z
      .string()
      .min(10, { message: "Should have at least 10 characters" }),
    [FIELD_PARAMS.NUM_LICENSES]: z
      .string()
      .min(1, "Please enter number of licenses") // Ensure it's not empty
      .refine((val) => /^\d+$/.test(val), {
        message: "Must be a valid number", // Check if it's only digits
      }),
    [FIELD_PARAMS.EXPIRY_DATE]: z.string().min(1, "Expiry Date is required"),
    [FIELD_PARAMS.EMAIL_SENT]: z.boolean(),
    [FIELD_PARAMS.ASSIGN_LICENSE]: z.boolean(),
    // file: z
    //     .string()
    //     .nonempty("A file must be uploaded."),
    file: z
      .instanceof(File)
      .refine(
        (file) =>
          file.type === "application/vnd.ms-excel" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        {
          message: "Only .xls and .xlsx files are allowed",
        }
      )
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File size must be less than 5MB",
      }),
  })
  .partial();

export type coreFormData = z.infer<typeof coreFormSchema>;
