"use client"

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteLocation } from "@/services/admin/locationManagement";



import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUserGuide } from "@/types/user.interface";
import GuideColumns from "./GuideColumns";
import GuideViewFormDialog from "./GuideViewFormDialog";
import GuideStatusFormDialog from "./GuideStatusFormDialog";


interface GuideTableProps {
  guides: IUserGuide[];
}
const GuideTable = ({guides}: GuideTableProps) => {
    const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingGuide, setDeletingGuide] = useState<IUserGuide | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
const [viewOpen, setViewOpen] = useState(false);
const [selectedId, setSelectedId] = useState<string | undefined>();

  const [editingGuide, setEditingGuide] = useState<IUserGuide | null>(null);
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };


 const handleView = (guide: IUserGuide) => {
  setSelectedId(guide.id);
  setViewOpen(true);
};


  const handleEdit = (guide: IUserGuide) => {
    setEditingGuide(guide);
  };

  const handleDelete = (guide: IUserGuide) => {
    setDeletingGuide(guide);
  };

  const confirmDelete = async () => {
    if (!deletingGuide) return;

    setIsDeleting(true);
    const result = await deleteLocation(deletingGuide.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "guides deleted successfully");
      setDeletingGuide(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete guides");
    }
  };
    return (
        <>
      <ManagementTable
        data={guides}
        columns={GuideColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(guides) => guides.id!}
        emptyMessage="No guides found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingGuide}        
        onOpenChange={(open) => !open && setDeletingGuide(null)}
        onConfirm={confirmDelete}
        title="Delete guides"
        description={`Are you sure you want to delete this guides? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
  <GuideViewFormDialog
  open={viewOpen}
  onOpenChange={(open) => {
    setViewOpen(open);
    if (!open) setSelectedId(null!);
  }}
  id={selectedId}
/>
<GuideStatusFormDialog 
  open={!!editingGuide}
    onClose={() => setEditingGuide(null)}
    onSuccess={handleRefresh}
    guide={editingGuide as IUserGuide}
/>
    </>
    );
};

export default GuideTable;