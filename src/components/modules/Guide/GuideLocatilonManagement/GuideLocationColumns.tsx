"use client";

import { Column } from "@/components/shared/ManagementTable";
import { IGuideLocation } from "@/types/guideLocation.interface";



export const GuideLocationColumns: Column<IGuideLocation>[] = [
  {
    header: "City",
    accessor: (GuideLoca) => GuideLoca.location.city,

  },
  {
    header: "Country",
    accessor: (GuideLoca) => GuideLoca.location.country,

  },
  
  {
    header: "Guide",
    accessor: (GuideLoca) => GuideLoca.guide.name,
    
  },

  {
    header: "Created At",
    accessor: (GuideLoca) => GuideLoca.createdAt.slice(0, 10),
    sortKey: "createdAt",
  },
  
];
