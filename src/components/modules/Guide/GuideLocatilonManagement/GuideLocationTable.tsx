
"use client"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { GuideLocationColumns } from "./GuideLocationColumns";
import { IGuideLocation } from "@/types/guideLocation.interface";
import { deleteGuideLacation } from "@/services/guide/guideAvailableLoacation";

interface GuideLocationTableProps {
  guideLocations: IGuideLocation[];
}

const GuideLocationTable = ({guideLocations}: GuideLocationTableProps) => {
     const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingGuideLocation, setDeletingGuideLocation] = useState<IGuideLocation | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (guideLocations: IGuideLocation) => {
    setDeletingGuideLocation(guideLocations);
  };

  const confirmDelete = async () => {
    if (!deletingGuideLocation) return;

    setIsDeleting(true);
    const result = await deleteGuideLacation(deletingGuideLocation.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Guide Location deleted successfully");
      setDeletingGuideLocation(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete guide");
    }
  };
    return (
         <>
      <ManagementTable
        data={guideLocations}
        columns={GuideLocationColumns}
        onDelete={handleDelete}
        getRowKey={(schedule) => schedule.id!}
        emptyMessage="No Guide Location found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingGuideLocation}
        onOpenChange={(open) => !open && setDeletingGuideLocation(null)}
        onConfirm={confirmDelete}
        title="Delete Guide Location"
        description={`Are you sure you want to delete this guide location? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
    );
};

export default GuideLocationTable;