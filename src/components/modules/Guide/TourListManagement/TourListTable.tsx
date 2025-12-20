

"use client"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ITourList } from "@/types/tourList.interface";
import { deleteTourList } from "@/services/guide/guideTourList";
import TourListColumns from "./TourListColumns";
import TourListUpdateDialog from "./TourListUpdateDialog";
import TourListViewDialog from "./TourListViewDialog";

interface AvailabilityTableProps {
  tourLists: ITourList[];
}

const TourListTable = ({tourLists}: AvailabilityTableProps) => {
     const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTourList, setDeletingTourList] = useState<ITourList | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingTourList, setEditingTourList] = useState<ITourList | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();

 const handleView = (tourList: ITourList) => {
  setSelectedId(tourList.id);
  setViewOpen(true);
};



const handleEdit = (tourList: ITourList) => {
    setEditingTourList(tourList);
  };

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (tourList: ITourList) => {
    setDeletingTourList(tourList);
  };

  const confirmDelete = async () => {
    if (!deletingTourList) return;

    setIsDeleting(true);
    const result = await deleteTourList( deletingTourList.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Tour List deleted successfully");
      setDeletingTourList(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete Tour List");
    }
  };
    return (
         <>
      <ManagementTable
        data={tourLists}
        columns={TourListColumns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        getRowKey={(tourList) => tourList.id!}
        emptyMessage="No Tour List found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTourList}
        onOpenChange={(open) => !open && setDeletingTourList(null)}
        onConfirm={confirmDelete}
        title="Delete   Tour List"
        description={`Are you sure you want to delete this Tour List? This action cannot be undone.`}
        isDeleting={isDeleting}
      />

       <TourListViewDialog
  open={viewOpen}
  onOpenChange={(open) => {
    setViewOpen(open);
    if (!open) setSelectedId(null!);
  }}
  id={selectedId}
/>
<TourListUpdateDialog 
  open={!!editingTourList}
    onClose={() => setEditingTourList(null)}
    onSuccess={handleRefresh}
    tourLists={editingTourList as ITourList}
/>
    </>
    );
};

export default TourListTable;