import BookingFilter from "@/components/modules/Admin/BookingManagement/BookingFilter";
import BookingManagementHeader from "@/components/modules/Admin/BookingManagement/BookingManagementHeader";
import BookingTable from "@/components/modules/Admin/BookingManagement/BookingTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllBookings } from "@/services/admin/bookingManagement";
import { Suspense } from "react";

const BookingsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const bookingResult = await getAllBookings(queryString);
    const totalPages = Math.ceil(
        (bookingResult?.meta?.total || 1) / (bookingResult?.meta?.limit || 1)
    );
    return (
        <div>
            <BookingManagementHeader></BookingManagementHeader>
        <BookingFilter />
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <BookingTable bookings={bookingResult?.data || []} />
                <TablePagination
                    currentPage={bookingResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default BookingsPage;