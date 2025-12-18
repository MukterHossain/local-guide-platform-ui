import {  z } from "zod";


export const createAvailabilitySchema = z.object({
//   guideId:z.string({message: "Guide ID is required"}),
  startAt: z.string({message: "Start time is required"}),
    endAt: z.string({message: "End time is required"}),
})