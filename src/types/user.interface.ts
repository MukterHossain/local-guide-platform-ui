import { UserRole } from "@/lib/auth-utils";
import { updateUserSchema } from "@/zod/user.validation";
import z from "zod";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    gender: "MALE" | "FEMALE";
    phone: string;
    address: string;
    bio: string;
    image: string;
    languages: string[];
    needPasswordChange: boolean;
    status: "ACTIVE" | "BLOCKED" | "DELETED";
    
    profile?: {
    expertise?: string | null;
    experienceYears?: number | null;
    feePerHour?: number | null;
    availableStatus?: boolean | null;
    verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";
    avgRating?: number | null;
    locationId?: string | null;
    adminNote?: string | null;
  } | null;

  createdAt: string;
  updatedAt: string;

    
}
export interface IUserGuide {
  id: string;
  name: string;
  email: string;

  image?: string | null;
  gender?: "MALE" | "FEMALE";

  phone?: string | null;
  bio?: string | null;
  languages?: string[] | null;
  address?: string | null;

  role: UserRole;
  needPasswordChange: boolean;
  status: "ACTIVE" | "BLOCKED" | "DELETED";

  profile?: {
    expertise?: string | null;
    experienceYears?: number | null;
    feePerHour?: number | null;
    availableStatus?: boolean | null;
    verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";
    avgRating?: number | null;
    locationId?: string | null;
    adminNote?: string | null;
  } | null;

  createdAt: string;
  updatedAt: string;
}

 export type UpdateUserPayload = z.infer<typeof updateUserSchema>
//   {
//   name?: string;
//   phone?: string;
//   address?: string;
//   bio?: string;
//   languages?: string[];
//   profile?: {
//     expertise?: string;
//     experienceYears?: number;
//     feePerHour?: number;
//   };
// };