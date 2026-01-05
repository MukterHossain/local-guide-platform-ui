import { Column } from '@/components/shared/ManagementTable';
import { ITourList } from '@/types/tourList.interface';

const AdminTourListColumns:Column<ITourList>[] = [
  {
    header: "Title",
    accessor: (tour) => tour.title,
    sortKey: "title",
  },
  {
    header: "Description",
    accessor: (tour) => tour.description,
  },
  {
    header: "Duration",
    accessor: (tour) => `${tour.durationHours} hours`,
  },
  {
    header: "City",
    accessor: (tour) => tour.city,
  },
  {
    header: "Status",
    accessor: (tour) => tour.status,
  },

  {
    header: "Tour Fee",
    accessor: (tour) => `$${tour.tourFee}`,
  },
  {
    header: "Max People",
    accessor: (tour) => tour.maxPeople,
  },
    {
    header: "Meeting Point",
    accessor: (tour) => tour.meetingPoint,
  },
    {
    header: "Created At",
    accessor: (tour) => (tour.createdAt).toString().slice(0, 10),
    sortKey: "createdAt",
  }
];

export default AdminTourListColumns;