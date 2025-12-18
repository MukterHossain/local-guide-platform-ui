"use client";

import { Column } from "@/components/shared/ManagementTable";
import { IAvailability } from "@/types/availability.interface";

export const AvailabilityColumns: Column<IAvailability>[] = [
  {
    header: "Start At",
    accessor: (availability) => availability.startAt.slice(0, 10),
    sortKey: "startAt",
  },
  {
    header: "End At",
    accessor: (availability) => availability.endAt.slice(0, 10),
    sortKey: "endAt",
  },
  {
    header: "Booked",
    accessor: (availability) => availability.isBooked ? "Yes" : "No",
  },
  {
    header: "Created At",
    accessor: (availability) => availability.createdAt.slice(0, 10),
    sortKey: "createdAt",
  },
  
];
