import { Column } from "@/components/shared/ManagementTable";
import { ITourList } from "@/types/tourList.interface";

const TourListColumns: Column<ITourList>[] = [
  {
    header: "Title",
    accessor: (tourList) => tourList.title,
  },
  {
    header: "Duration (Hours)",
    accessor: (tourList) => tourList.durationHours,
    sortKey: "durationHours",
  },
  {
    header: "City",
    accessor: (tourList) => tourList.city,
    sortKey: "city",
  },
  {
    header: "Tour Fee",
    accessor: (tourList) => tourList.tourFee,
    sortKey: "tourFee",
  },
  {
    header: "Max People",
    accessor: (tourList) => tourList.maxPeople,
    sortKey: "maxPeople",
  },

  
];


export default TourListColumns;