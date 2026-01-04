import TouristManagementHeader from '@/components/modules/Admin/TouristManagement/TouristManagementHeader';
import TouristTable from '@/components/modules/Admin/TouristManagement/TouristTable';
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
    return (
        <div>
            <TouristManagementHeader></TouristManagementHeader>
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <TouristTable tourists={tourListResult?.data || []} />
                <TablePagination
                    currentPage={tourListResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default TourListingsPage;