import {  z } from "zod";


export const createAvailabilitySchema = z.object({
tourId: z.string({ message: "Tour ID is required" }),
  startAt: z.string({message: "Start time is required"}),
    endAt: z.string({message: "End time is required"}),
})