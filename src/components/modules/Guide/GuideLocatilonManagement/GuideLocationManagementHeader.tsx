"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";


import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import GuideLocationFormDialog from "./GuideLocationFormDialog";

const GuideLocationManagementHeader = () => {
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
      <GuideLocationFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Guide Location Management"
        description="Create and manage guide locations."
        action={{
          label: "Create Guide Location",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
    );
};

export default GuideLocationManagementHeader;