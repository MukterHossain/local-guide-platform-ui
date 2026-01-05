import AdminTouristListManagementHeader from '@/components/modules/Admin/TourListingsManagement/AdminTourListManagementHeader';
import AdminTouristListTable from '@/components/modules/Admin/TourListingsManagement/AdminTourListTable';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllTours } from '@/services/admin/tourListManagement';
import React, { Suspense } from 'react';

const TourListingsPage =async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const tourListResult = await getAllTours(queryString);
    const totalPages = Math.ceil(
        (tourListResult?.meta?.total || 1) / (tourListResult?.meta?.limit || 1)
    );

    console.log("tourListResult", tourListResult)
    return (
        <div>
            <AdminTouristListManagementHeader></AdminTouristListManagementHeader>
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <AdminTouristListTable  tourLists={tourListResult?.data || []} />
                <TablePagination
                    currentPage={tourListResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default TourListingsPage;