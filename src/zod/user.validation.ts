import { z } from "zod";

export const profileValidation = z.object({
   experienceYears: z.number().optional(),
   expertise: z.string().optional(),
  feePerHour: z.number().optional(),
  avgRating: z.number().optional(),
  locationId: z.string().optional().nullable(),
}).optional();

export const createUserValidation = z.object({
    password: z.string({
        message: "Password is required",
    }),
    name: z.string({
        message: "Name is required!",
    }),
    email: z.string({
        message: "Email is required!",
    }),
    gender: z.enum(["MALE", "FEMALE"]),
    phone: z.string({
        message: "Contact Number is required!",
    }),
    languages: z.array(z.string()).optional(),
    image: z.string().optional(),
     bio: z.string().optional(),
    address: z.string().optional(),
     role: z.enum(["TOURIST", "GUIDE"]).default("TOURIST"),
     profile: profileValidation
   
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

export const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  languages: z.array(z.string()).optional(),
    profile: z.object({
    expertise: z.string().optional(),
    experienceYears: z.number().optional(),
    feePerHour: z.number().optional(),
  }).optional()

});


export const adminUpdateGuideStatus = z.object({
  verificationStatus: z.enum(["PENDING", "VERIFIED", "REJECTED"]).optional(),
  adminNote: z.string().optional(),
  status: z.enum(["ACTIVE", "PENDING", "BLOCKED", "DELETED"]).optional()
});
export const adminUpdateTouristStatus = z.object({
  status: z.enum(["ACTIVE", "PENDING", "BLOCKED", "DELETED"]).optional()
});










