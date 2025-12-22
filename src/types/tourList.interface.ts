/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserGuide } from "./user.interface";


export interface ITourList {
  id: string;
  guideId: string;
  title: string;
  description: string;
  durationHours: number;
  city: string;
  images: string[];
  tourFee: number;
  maxPeople: number;
  meetingPoint: string;

  createdAt: string | Date;
  updatedAt: string | Date;

  guide?: IUserGuide
}

export type TourUpdatePayload = Partial<{
  title: string;
  description: string;
  city: string;
  meetingPoint: string;
  durationHours: number;
  tourFee: number;
  maxPeople: number;
  categories: any[];
  images: string[];
}>;