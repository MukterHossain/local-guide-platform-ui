import z from "zod";


export const createGuideLocationSchema = z.object({
  locationId:z.string({message: "Location ID is required"}),
//   guideId: z.string({message: "Guide ID is required"}),
})