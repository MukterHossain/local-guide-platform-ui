import { BookingStatus, PaymentStatus } from "@/types/enum";
import z from "zod";

export const createBooking = z.object({
  body: z.object({
    tourId: z.string(),
    availabilityId: z.string(),

    bookingDate: z.string().refine(
      (date) => !isNaN(Date.parse(date)),
      "Invalid booking date"
    ),
  }),
});


export const updateBookingStatus = z.object({
  body: z.object({
    status: BookingStatus,
  }),
});


// export const bookingResponse = z.object({
//   id: z.string(),
//   tourId: z.string(),
//   userId: z.string(),
//   availabilityId: z.string(),

//   bookingDate: z.string(),
//   status: BookingStatus,
//   totalFee: z.number(),
//   paymentStatus: PaymentStatus,

//   createdAt: z.string(),
//   updatedAt: z.string(),

//   tour: tourResponse.optional(),
// });
