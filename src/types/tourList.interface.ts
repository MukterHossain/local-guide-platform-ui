/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAvailability } from "./availability.interface";
import { IBooking } from "./booking.interface";
import {  ITourCategory } from "./category.interface";
import { TourStatus } from "./enum";
import { ILocation } from "./location.interface";
import { IReview} from "./review.interface";
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
  status: TourStatus;
  meetingPoint?: string;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;

  guide?: IUserGuide;
  bookings?: IBooking[];
  location?: ILocation;
  reviews?: IReview[];
  categories?: ITourCategory[];
  availability?: IAvailability[];

  avgRating?: number;
  reviewCount?: number;

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