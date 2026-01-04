import { z } from "zod";

export const profileValidation = z.object({
  image: z.string().optional(),
  bio: z.string().optional(),

  languages: z.array(z.string()).default([]),
address: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),

  // Guide only
  expertise: z.string().optional(),
  experienceYears: z.number().int().min(0).optional(),
  dailyRate: z.number().positive().optional(),
  locationIds: z.array(z.string()).optional(),
}).optional();

export const createUserValidation = z.object({
  name: z.string({
    message: "Name is required!",
  }),
  email: z.string({
    message: "Email is required!",
  }),
  phone: z.string().optional(),
  password: z.string({
    message: "Password is required",
  }).min(6, {
    message: "Password is required and must be at least 6 characters long",
  }),
  confirmPassword: z.string({
    message: "Confirm Password is required",
  }),

}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});
export const touristPreferenceValidation = z.object({
  interests: z.array(z.string()).optional(),
  preferredLangs: z.array(z.string()).optional(),
  travelStyle: z.enum(["CASUAL", "ADVENTURE", "LUXURY"]),
  groupSize: z.number().optional(),
  travelPace: z.enum(["SLOW", "MODERATE", "FAST"]).optional(),
});

export const becomeGuideValidation = z.object({
  expertise: z.string().min(2 ,{message: "Expertise is required"}),
  experienceYears: z.number().int().min(0),
  dailyRate: z.number().positive(),
  locationIds: z.array(z.string()).min(1)
});


export const updateUserValidation = z.object({
 name: z.string().optional(),
  phone: z.string().optional(),
  

  profile: profileValidation.optional(),
  touristPreference: touristPreferenceValidation.optional(),
});

export const createAdminValidation = z.object({
  password: z.string({ message: "Password is required" }),
  name: z.string({ message: "Name is required" }),
  email: z.string({ message: "Email is required" }),
  gender: z.enum(["MALE", "FEMALE"]),
  bio: z.string().optional(),
  languages: z.array(z.string()).optional(),
  phone: z.string({ message: "Contact Number is required" }),
  image: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(["ADMIN"]),
});

export const adminUpdateGuideStatus = z.object({
  verificationStatus: z.enum(["PENDING", "VERIFIED", "REJECTED"]).optional(),
  adminNote: z.string().optional(),
  status: z.enum(["ACTIVE", "PENDING", "BLOCKED", "DELETED"]).optional()
});
export const adminUpdateTouristStatus = z.object({
  status: z.enum(["ACTIVE", "PENDING", "BLOCKED", "DELETED"]).optional()
});










