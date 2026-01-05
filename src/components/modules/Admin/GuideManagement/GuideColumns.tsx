"use client";

import GenderBadgeCell from "@/components/shared/cell/GenderBadgeCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import VerificationBadgeCell from "@/components/shared/cell/VerificationBadgeCell";
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
    header: "Verification",
    accessor: (user) => <VerificationBadgeCell pending={user?.profile?.verificationStatus === "PENDING"} verified={user?.profile?.verificationStatus === "VERIFIED"} rejected={user?.profile?.verificationStatus === "REJECTED"} />,
  },
  {
    header: "Role",
    accessor: (user) => user.role.toLocaleLowerCase(),
    sortKey: "role",
  },
  {
    header: "Gender",
    accessor: (user) => <GenderBadgeCell maile={user?.profile?.gender === "MALE"} female={user?.profile?.gender === "FEMALE" } /> ,
    sortKey: "role",
  },
  {
    header: "Created At",
    accessor: (user) => (user.createdAt).slice(0, 10),
    sortKey: "createdAt",
  }
];
export default GuideColumns;