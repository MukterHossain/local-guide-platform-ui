
"use client";

import { Column } from "@/components/shared/ManagementTable";
import { IBooking } from "@/types/booking.interface";

export const MyBookingsColumns: Column<IBooking>[] = [
  {
    header: "Payment Status",
    accessor: (booking) => booking.paymentStatus,
  },
  {
    header: "Status",
    accessor: (booking) => booking.status,
  },
  {
    header: "Total Fee",
    accessor: (booking) => booking.totalFee,
  },
//   {
//     header: "Created At",
//     accessor: (booking) => booking.createdAt,
//   }  
  
];
