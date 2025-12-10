"use client"
import { Column } from "@/components/shared/ManagementTable";
import { ICategory } from "@/types/category.interface";

const CategoryColumns: Column<ICategory>[] = [
  {
    header: "Name",
    accessor: (category) => category.name,
    sortKey: "locationName",
  }
  
];

export default CategoryColumns;