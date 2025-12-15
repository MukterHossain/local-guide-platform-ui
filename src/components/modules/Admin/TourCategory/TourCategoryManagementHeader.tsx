"use client"

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const TourCategoryManagementHeader =  () => {
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
      {/* <LocationFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      /> */}

      <ManagementPageHeader
        title="Booking Management"
        description="Create and manage bookings."
        action={{
          label: "Create Booking",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
    );
    
};

export default TourCategoryManagementHeader;