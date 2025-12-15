"use client";

import { Column } from '@/components/shared/ManagementTable';
import { IBooking } from '@/types/booking.interface';

const bookingColumns: Column<IBooking>[] = [
  {
    header: "Booking Date",
    accessor: (booking) => booking.totalFee,
    sortKey: "bookingDate",
  },
  {
    header: "Payment Status",
    accessor: (booking) => booking.paymentStatus,
    sortKey: "paymentStatus",
  },
  {
    header: "Status",
    accessor: (booking) => booking.status,
    sortKey: "status",
  },
  
];

export default bookingColumns;