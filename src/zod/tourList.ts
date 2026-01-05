
import { z } from "zod";

export const tourCreateValidation = z.object({
  title: z.string({ message: "Title is required" }).min(1),
  description: z.string({ message: "Description is required" }).min(1),
  city: z.string({ message: "City is required" }).min(1),
  durationHours: z.number({ message: "Duration is required" }).positive({
    message: "Duration must be a positive number",}),
  tourFee: z.number({ message: "Fee is required" }).positive({
    message: "Fee must be a positive number",
  }),
  maxPeople: z.number({ message: "Max people is required" }).positive(),
  meetingPoint: z.string().optional(),

  images: z.array(z.string()).optional().default([]),

  categories: z.array(
    z.object({
      categoryId: z.string()
    })
  ).min(1, "At least one category is required")
});
export const tourUpdateValidation = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  tourFee: z.coerce.number().optional(),
  durationHours: z.coerce.number().optional(),
  maxPeople: z.coerce.number().optional(),
  city: z.string().optional(),
  meetingPoint: z.string().optional(),
  categories: z.array(
    z.object({ categoryId: z.string() })
  ).optional(),
});


export const tourListUpdateValidation = z.object({
  status: z.enum(["DRAFT", "PUBLISHED", "BLOCKED"], {
    message: "Status is required",
  }),
});









 