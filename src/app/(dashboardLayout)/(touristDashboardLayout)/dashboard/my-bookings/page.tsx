import MyBookingsFilter from "@/components/modules/Tourist/MyBookingsManagement/MyBookingsFilter";
import MyBookingsManagementHeader from "@/components/modules/Tourist/MyBookingsManagement/MyBookingsManagementHeader";
import MyBookingsTable from "@/components/modules/Tourist/MyBookingsManagement/MyBookingsTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyBookings } from "@/services/tourist/myBookings";
import { Suspense } from "react";

const MyBookingsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const myBookingsResult = await getMyBookings(queryString);
    const totalPages = Math.ceil(
        (myBookingsResult?.meta?.total || 1) / (myBookingsResult?.meta?.limit || 1)
    );

    console.log("myBookingsResult", myBookingsResult);
    return (
        <div>
            <MyBookingsManagementHeader />
            <MyBookingsFilter />
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <MyBookingsTable bookings={myBookingsResult?.data || []} />
                <TablePagination
                    currentPage={myBookingsResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default MyBookingsPage;