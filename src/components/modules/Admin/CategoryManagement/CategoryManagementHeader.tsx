"use client"
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import CategoryFormDialog from "./CategoryFormDialog";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";


const CategoryManagementHeader = () => {
          const router = useRouter();
      const [, startTransition] = useTransition();
      const [isDialogOpen, setIsDialogOpen] = useState(false);
    
      const handleSuccess = () => {
        startTransition(() => {
          router.refresh();
        });
      };
    
      //force remount to reset state of form
      const [dialogKey, setDialogKey] = useState(0);
    
      const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
      };
        const handleCloseDialog = () => {
        setIsDialogOpen(false);
      };
    return (
         <>
      <CategoryFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Category Management"
        description="Create and manage categories."
        action={{
          label: "Create Category",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
    );
};

export default CategoryManagementHeader;