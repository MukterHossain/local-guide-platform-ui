/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAvailability } from "./availability.interface";
import { IBooking } from "./booking.interface";
import {  ICategory, ITourCategory} from "./category.interface";
import { TourStatus } from "./enum";
import { ILocation } from "./location.interface";
import { IReview} from "./review.interface";
import { UserInfo } from "./user.interface";



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
  status: TourStatus;
  meetingPoint?: string;
  isDeleted: boolean;


  guide?: UserInfo;
  bookings?: IBooking[];
  location?: ILocation;
  reviews?: IReview[];
  categories?: ITourCategory[];
  availabilities?: IAvailability[];

  avgRating?: number;
  reviewCount?: number;

  createdAt: string;
  updatedAt: string;
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