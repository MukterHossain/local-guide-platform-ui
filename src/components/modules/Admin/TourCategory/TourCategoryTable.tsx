"use client";

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import TourCategoryColumns from './TourCategoryColumns';
import { ITourCategory } from '@/types/tourCategory.interface';
import { deleteTourCategory } from '@/services/admin/tourCategoryManagement';


interface TourCategoryTableProps {
  tourCategory: ITourCategory[];
}
const TourCategoryTable = ({tourCategory}: TourCategoryTableProps) => {
      const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingLocation, setDeletingLocation] = useState<ITourCategory | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (category: ITourCategory) => {
    setDeletingLocation(category);
  };

  const confirmDelete = async () => {
    if (!deletingLocation) return;

    setIsDeleting(true);
    const result = await deleteTourCategory(deletingLocation.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Tour Category deleted successfully");
      setDeletingLocation(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete Tour category");
    }
  };
    return (
         <>
      <ManagementTable
        data={tourCategory}
        columns={TourCategoryColumns}
        onDelete={handleDelete}
        getRowKey={(category) => category.id!}
        emptyMessage="No Tour category found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingLocation}
        onOpenChange={(open) => !open && setDeletingLocation(null)}
        onConfirm={confirmDelete}
        title="Delete Tour category"
        description={`Are you sure you want to delete this Tour category? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
    );
};

export default TourCategoryTable;