import z from "zod";

export const createLocationSchema = z.object({
  city:z.string({message: "City is required"}),
  country: z.string({message: "Country is required"}),
})
export const updateLocaionSchema = z.object({
  city:z.string().optional(),
  country: z.string().optional(),
})
