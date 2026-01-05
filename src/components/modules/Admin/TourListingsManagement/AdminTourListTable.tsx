'use client';

import ManagementTable from "@/components/shared/ManagementTable";
import { ITourList } from "@/types/tourList.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import TourListColumns from "../../Guide/TourListManagement/TourListColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import TouristListViewFormDialog from "./AdminTourListViewFormDialog";
import { deleteTourList } from "@/services/admin/tourListManagement";
import TourListStatusUpdateFormDialog from "./AdminTourListStatusUpdateFormDialog";
import AdminTouristListViewFormDialog from "./AdminTourListViewFormDialog";
import AdminTourListStatusUpdateFormDialog from "./AdminTourListStatusUpdateFormDialog";


interface TourListTableProps {
  tourLists: ITourList[];
}
const AdminTouristListTable = ({ tourLists }: TourListTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTourist, setDeletingTourist] = useState<ITourList | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const [editingTourist, setEditingTourist] = useState<ITourList | null>(null);
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };


  const handleView = (tourist: ITourList) => {
    setSelectedId(tourist.id);
    setViewOpen(true);
  };


  const handleEdit = (tourist: ITourList) => {
    setEditingTourist(tourist);
  };

  const handleDelete = (tourist: ITourList) => {
    setDeletingTourist(tourist);
  };

  const confirmDelete = async () => {
    if (!deletingTourist) return;

    setIsDeleting(true);
    const result = await deleteTourList(deletingTourist.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Tour List deleted successfully");
      setDeletingTourist(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete tour lists");
    }
  };
  console.log("tour list", tourLists)
  return (
    <>
      <ManagementTable
        data={tourLists}
        columns={TourListColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(tourist) => tourist.id!}
        emptyMessage="No tourists found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTourist}
        onOpenChange={(open) => !open && setDeletingTourist(null)}
        onConfirm={confirmDelete}
        title="Delete tour list"
        description={`Are you sure you want to delete this tour list? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
      <AdminTouristListViewFormDialog
        open={viewOpen}
        onOpenChange={(open) => {
          setViewOpen(open);
          if (!open) setSelectedId(null!);
        }}
        id={selectedId}
      />
      <AdminTourListStatusUpdateFormDialog
        open={!!editingTourist}
        onClose={() => setEditingTourist(null)}
        onSuccess={handleRefresh}
        tourLists={editingTourist as ITourList}
      />
    </>
  );
};

export default AdminTouristListTable;