
"use client"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AvailabilityColumns } from "./AvailabilityColumns";
import { IAvailability } from "@/types/availability.interface";
import { deleteAvailability } from "@/services/guide/guideAvailable";

interface AvailabilityTableProps {
  availabilities: IAvailability[];
}
const AvailabilityTable = ({availabilities}: AvailabilityTableProps) => {
     const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingAvailability, setDeletingAvailability] = useState<IAvailability | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (availabilities: IAvailability) => {
    setDeletingAvailability(availabilities);
  };

  const confirmDelete = async () => {
    if (!deletingAvailability) return;

    setIsDeleting(true);
    const result = await deleteAvailability( deletingAvailability.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Availability deleted successfully");
      setDeletingAvailability(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete availability");
    }
  };
    return (
         <>
      <ManagementTable
        data={availabilities}
        columns={AvailabilityColumns}
        onDelete={handleDelete}
        getRowKey={(schedule) => schedule.id!}
        emptyMessage="No availabilities found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingAvailability}
        onOpenChange={(open) => !open && setDeletingAvailability(null)}
        onConfirm={confirmDelete}
        title="Delete   Availability"
        description={`Are you sure you want to delete this Availability? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
    );
};

export default AvailabilityTable;