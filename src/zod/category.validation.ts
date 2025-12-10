import z from "zod";


export const categoryCreateValidation = z.object({
  name: z
    .string({ message: "Category name is required" })
    .min(2, { message: "Category name cannot be empty" }),
});

export const categoryUpdateValidation = z.object({
  name: z.string().min(1).optional(),
});
