
"use client"
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface BookingsTableProps {
  bookings: IBooking[];
}

import { deleteBooking } from "@/services/tourist/myBookings";
import { IBooking } from "@/types/booking.interface";
import { MyBookingsColumns } from "./MyBookingsColumns";

const MyBookingsTable =  ({bookings}: BookingsTableProps) => {
     const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingBooking, setDeletingBooking] = useState<IBooking | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (bookings: IBooking) => {
    setDeletingBooking(bookings);
  };

  const confirmDelete = async () => {
    if (!deletingBooking) return;

    setIsDeleting(true);
    const result = await deleteBooking( deletingBooking.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Booking deleted successfully");
      setDeletingBooking(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete availability");
    }
  };
    return (
         <>
      <ManagementTable
        data={bookings}
        columns={MyBookingsColumns}
        onDelete={handleDelete}
        getRowKey={(schedule) => schedule.id!}
        emptyMessage="No availabilities found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingBooking}
        onOpenChange={(open) => !open && setDeletingBooking(null)}
        onConfirm={confirmDelete}
        title="Delete   Availability"
        description={`Are you sure you want to delete this Availability? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
    );
};

export default MyBookingsTable;