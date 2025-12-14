"use client"

import ManagementTable from "@/components/shared/ManagementTable";
import { deleteUser } from "@/services/admin/userManagement";
import { UserInfo } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import TouristColumns from "./TouristColumns";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import TouristviewFormDialog from "./TouristviewFormDialog";
import TouristStatusFormDialog from "./TouristStatusFormDialog";





interface TourstTableProps {
  tourists: UserInfo[];
}
const TouristTable = ({tourists}: TourstTableProps ) => {
    const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTourist, setDeletingTourist] = useState<UserInfo | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
const [viewOpen, setViewOpen] = useState(false);
const [selectedId, setSelectedId] = useState<string | undefined>();

  const [editingTourist, setEditingTourist] = useState<UserInfo | null>(null);
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };


 const handleView = (guide: UserInfo) => {
  setSelectedId(guide.id);
  setViewOpen(true);
};


  const handleEdit = (tourist: UserInfo) => {
    setEditingTourist(tourist);
  };

  const handleDelete = (tourist: UserInfo) => {
    setDeletingTourist(tourist);
  };

  const confirmDelete = async () => {
    if (!deletingTourist) return;

    setIsDeleting(true);
    const result = await deleteUser(deletingTourist.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Tourist deleted successfully");
      setDeletingTourist(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete guides");
    }
  };
    return (
        <>
      <ManagementTable
        data={tourists}
        columns={TouristColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(tourist) => tourist.id!}
        emptyMessage="No guides found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTourist}        
        onOpenChange={(open) => !open && setDeletingTourist(null)}
        onConfirm={confirmDelete}
        title="Delete guides"
        description={`Are you sure you want to delete this guides? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
  <TouristviewFormDialog
  open={viewOpen}
  onOpenChange={(open) => {
    setViewOpen(open);
    if (!open) setSelectedId(null!);
  }}
  id={selectedId}
/>
<TouristStatusFormDialog 
  open={!!editingTourist}
    onClose={() => setEditingTourist(null)}
    onSuccess={handleRefresh}
    tourist={editingTourist as UserInfo}
/>
    </>
    );
};

export default TouristTable;