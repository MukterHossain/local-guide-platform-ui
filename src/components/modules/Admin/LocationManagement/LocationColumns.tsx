"use client";

import { Column } from "@/components/shared/ManagementTable";

import { ILocation } from "@/types/location.interface";


export const LocationColumns: Column<ILocation>[] = [
  {
    header: "City",
    accessor: (location) => location.city,
    sortKey: "locationName",
  },
  {
    header: "Country",
    accessor: (location) => location.country,
    sortKey: "country",
  },
  
];