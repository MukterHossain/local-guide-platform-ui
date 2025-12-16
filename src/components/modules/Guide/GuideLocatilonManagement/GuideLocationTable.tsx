
"use client"
import { ILocation } from "@/types/location.interface";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteLocation } from "@/services/admin/locationManagement";
import { GuideLocationColumns } from "./GuideLocationColumns";

interface GiodeLocationTableProps {
  locations: ILocation[];
}

const GuideLocationTable = ({locations}: GiodeLocationTableProps) => {
     const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingLocation, setDeletingLocation] = useState<ILocation | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (location: ILocation) => {
    setDeletingLocation(location);
  };

  const confirmDelete = async () => {
    if (!deletingLocation) return;

    setIsDeleting(true);
    const result = await deleteLocation(deletingLocation.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Schedule deleted successfully");
      setDeletingLocation(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete schedule");
    }
  };
    return (
         <>
      <ManagementTable
        data={locations}
        columns={GuideLocationColumns}
        onDelete={handleDelete}
        getRowKey={(schedule) => schedule.id!}
        emptyMessage="No schedules found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingLocation}
        onOpenChange={(open) => !open && setDeletingLocation(null)}
        onConfirm={confirmDelete}
        title="Delete Location"
        description={`Are you sure you want to delete this location? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
    );
};

export default GuideLocationTable;