import { Column } from '@/components/shared/ManagementTable';
import { ITourCategory } from '@/types/tourCategory.interface';

const TourCategoryColumns: Column<ITourCategory>[] = [
  {
    header: "Tour Id",
    accessor: (tourCategory) => tourCategory.tourId,
    sortKey: "tourId",
  },
  {
    header: "Category Id",
    accessor: (tourCategory) => tourCategory.categoryId,
    sortKey: "categoryId",
  },
  
];

export default TourCategoryColumns;