"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";


import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TourListFormDialog from "./TourListFormDialog";

const TourListManagementHeader = () => {
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
      <TourListFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Tour List Management"
        description="Create and manage tour list for your tours."
        action={{
          label: "Create tour list",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
    );
};

export default TourListManagementHeader;