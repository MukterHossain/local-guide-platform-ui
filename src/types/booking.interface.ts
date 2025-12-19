
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";
export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

export interface IBooking {
  id: string;
  tourId: string;
  userId: string;
  availabilityId: string;

  bookingDate: string | Date;
  status: BookingStatus;

  totalFee: number;
  paymentStatus: PaymentStatus;

  createdAt: string | Date;
  updatedAt: string | Date;

//   // Optional populated relations
//   tour?: Tour;
//   availability?: Availability;
//   user?: User;
//   payment?: Payment | null;
}