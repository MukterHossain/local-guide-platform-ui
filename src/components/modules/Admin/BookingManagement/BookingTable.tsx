"use client";

import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ManagementTable from '@/components/shared/ManagementTable';
import { deleteBooking } from '@/services/admin/bookingManagement';
import { IBooking } from '@/types/booking.interface';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import bookingColumns from './bookingColumns';


interface BookingTableProps {
  bookings: IBooking[];
}
const BookingTable =  ({bookings}: BookingTableProps) => {
     const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingLocation, setDeletingLocation] = useState<IBooking | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (booking: IBooking) => {
    setDeletingLocation(booking);
  };

  const confirmDelete = async () => {
    if (!deletingLocation) return;

    setIsDeleting(true);
    const result = await deleteBooking(deletingLocation.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Booking deleted successfully");
      setDeletingLocation(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete booking");
    }
  };
    return (
         <>
      <ManagementTable
        data={bookings}
        columns={bookingColumns}
        onDelete={handleDelete}
        getRowKey={(schedule) => schedule.id!}
        emptyMessage="No booking found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingLocation}
        onOpenChange={(open) => !open && setDeletingLocation(null)}
        onConfirm={confirmDelete}
        title="Delete booking"
        description={`Are you sure you want to delete this booking? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
    );
};

export default BookingTable;