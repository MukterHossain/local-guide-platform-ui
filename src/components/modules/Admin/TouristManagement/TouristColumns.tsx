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
    accessor: (user) => user.status,
  },
  {
    header: "Role",
    accessor: (user) => user.role,
  },
  {
    header: "Gender",
    accessor: (user) => user.profile?.gender || "N/A",
  },
  {
    header: "Created At",
    accessor: (user) => (user.createdAt).slice(0, 10),
    sortKey: "createdAt",
  }
 
  
];

export default TouristColumns;