import { FIELD_PARAMS } from "@/constant/params";
import { z } from "zod";

export const seedSchema = z.object({
  [FIELD_PARAMS.NUM_OF_SEEDS]: z
    .string()
    .min(1, "Please enter seed number")
    .refine((val) => /^\d+$/.test(val), {
      message: "Must be a valid number",
    })
    .refine((val) => Number(val) >= 1 && Number(val) <= 50, {
      message: "Value must be between 01 and 50",
    }),
});

export type SeedData = z.infer<typeof seedSchema>;
