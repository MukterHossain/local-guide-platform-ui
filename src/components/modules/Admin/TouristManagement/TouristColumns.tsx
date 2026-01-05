import GenderBadgeCell from '@/components/shared/cell/GenderBadgeCell';
import { StatusBadgeCell } from '@/components/shared/cell/StatusBadgeCell';
import { Column } from '@/components/shared/ManagementTable';
import { UserInfo } from '@/types/user.interface';

const TouristColumns:Column<UserInfo>[] = [
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
    accessor: (user) => <StatusBadgeCell isDeleted={user.status === "DELETED"} isBlocked={user.status === "BLOCKED"}/>,
  },
  {
    header: "Role",
    accessor: (user) => user.role.toLocaleLowerCase(),
  },
  {
    header: "Gender",
    accessor: (user) => <GenderBadgeCell maile={user?.profile?.gender === "MALE"} female={user?.profile?.gender === "FEMALE"} />,
  },
  {
    header: "Created At",
    accessor: (user) => (user.createdAt).slice(0, 10),
    sortKey: "createdAt",
  }
 
  
];

export default TouristColumns;