"use client";

import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/ManagementTable";
import { IUserGuide } from "@/types/user.interface";

const GuideColumns: Column<IUserGuide>[] = [
  {
    header: "Name",
    accessor: (user) => user.name,
    sortKey: "name",
  },
  {
    header: "Email",
    accessor: (user) => user.email,
    sortKey: "email",
  },
  {
    header: "Phone",
    accessor: (user) => user.phone,
    sortKey: "phone",
  },
  {
    header: "Status",
    accessor: (user) => <StatusBadgeCell isDeleted={user.status === "DELETED"} isBlocked={user.status === "BLOCKED"}/> ,
  },
  {
    header: "verificationStatus",
    accessor: (user) => user?.profile?.verificationStatus,
  },
  {
    header: "Availability",
    accessor: (user) => user?.profile?.availableStatus ? "Available" : "Not Available",
  },
  {
    header: "Role",
    accessor: (user) => user.role,
    sortKey: "role",
  },
  {
    header: "Gender",
    accessor: (user) => user?.profile?.gender,
    sortKey: "role",
  },
  {
    header: "Created At",
    accessor: (user) => (user.createdAt).slice(0, 10),
    sortKey: "createdAt",
  }
 
  
];

export default GuideColumns;