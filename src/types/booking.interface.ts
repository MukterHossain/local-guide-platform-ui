import { IAvailability } from "./availability.interface";
import { BookingStatus, PaymentStatus } from "./enum";
import { IPayment } from "./payment.interface";
import { IReview } from "./review.interface";

import { ITourList } from "./tourList.interface";
import { UserInfo } from "./user.interface";

export interface IBooking {
  id: string;
  tourId: string;
  userId: string;
  availabilityId: string;
  bookingDate: string;
  status: BookingStatus;
  totalFee: number;
  paymentStatus: PaymentStatus;

  createdAt: string;
  updatedAt: string;

  tour?: ITourList;
  user?: UserInfo;
  payment?: IPayment | null;
  review?: IReview | null;
  availability?: IAvailability | null;
}

export interface IBookingFormData {
  tourId: string;
  availabilityId: string;
  bookingDate: string;
}
