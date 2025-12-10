"use client"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteCategory } from "@/services/admin/categoryManagement";
import { ICategory } from "@/types/category.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import CategoryColumns from "./CategoryColumns";


interface CategoryTableProps {
  category: ICategory[];
}
const CategoryTable = ({category}: CategoryTableProps) => {
      const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingLocation, setDeletingLocation] = useState<ICategory | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (category: ICategory) => {
    setDeletingLocation(category);
  };

  const confirmDelete = async () => {
    if (!deletingLocation) return;

    setIsDeleting(true);
    const result = await deleteCategory(deletingLocation.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Category deleted successfully");
      setDeletingLocation(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete category");
    }
  };
    return (
         <>
      <ManagementTable
        data={category}
        columns={CategoryColumns}
        onDelete={handleDelete}
        getRowKey={(category) => category.id!}
        emptyMessage="No category found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingLocation}
        onOpenChange={(open) => !open && setDeletingLocation(null)}
        onConfirm={confirmDelete}
        title="Delete category"
        description={`Are you sure you want to delete this category? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
    );
};

export default CategoryTable;