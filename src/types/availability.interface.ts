import { IBooking } from "./booking.interface";
import { IUserGuide } from "./user.interface";

export interface IAvailability {
  id: string;
  guideId: string;
  tourId: string;

  startAt: string;
  endAt: string;
  isBooked: boolean;

  guide?: IUserGuide;
  bookings?: IBooking[];

  createdAt: string;
  updatedAt: string;
}