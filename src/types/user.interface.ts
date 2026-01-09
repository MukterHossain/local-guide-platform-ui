import { UserRole } from "@/lib/auth-utils";
import { updateUserValidation } from "@/zod/user.validation";
import z from "zod";

// TouristPreference type for frontend
export interface TouristPreference {
  id?: string;
  interests?: string[];
  travelStyle?: "CASUAL" | "ADVENTURE" | "LUXURY";
  preferredLangs?: string[];
  groupSize?: number | null;
  travelPace?: "SLOW" | "MODERATE" | "FAST" | null;
}

// Nested profile structure for users
export interface UserProfile {
  image?: string | null;
  bio?: string | null;
  languages?: string[] ;
  gender?: "MALE" | "FEMALE" | null;
  address?: string | null;

  // Guide-only
  expertise?: string | null;
  experienceYears?: number | null;
  dailyRate?: number | null;
  avgRating?: number | null;
  availableStatus?: boolean | null;
  verificationStatus?: "PENDING" | "VERIFIED" | "REJECTED";
  adminNote?: string | null;
  location?: string | null;
  locationId?: string | null;
}

// Full user info type
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone?: string | null;

  role: UserRole;
  status: "ACTIVE" | "BLOCKED" | "DELETED" | "PENDING";
  needPasswordChange: boolean;

   guideLocations?: GuideLocation[];
  profile?: UserProfile | null;
  touristPreference?: TouristPreference | null;
  

  createdAt: string;
  updatedAt: string;
}


export interface GuideLocation {
  id: string;
  guideId: string;
  locationId: string;
  location?: {
    id: string;
    city: string;
    country: string;
  };
}

// Guide-specific info (can be used for listings)
export interface IUserGuide {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;

  status: "ACTIVE" | "BLOCKED" | "DELETED";
  needPasswordChange: boolean;

  profile?: UserProfile | null;
  

  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}



// Type for updating user payload based on zod schema
export type UpdateUserPayload = z.infer<typeof updateUserValidation>;
