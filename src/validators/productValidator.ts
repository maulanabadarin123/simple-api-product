import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.preprocess((val) => (typeof val === 'string' ? parseFloat(val) : val), z.number().positive("Price must be positive number")),
  description: z.string().min(1, "Description product is required")
});


export type ProductInput = z.infer<typeof productSchema>;