import TourListFilter from '@/components/modules/Guide/TourListManagement/TourListFilter';
import TourListManagementHeader from '@/components/modules/Guide/TourListManagement/TourListManagementHeader';
import TourListTable from '@/components/modules/Guide/TourListManagement/TourListTable';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getMyTourLists } from '@/services/guide/guideTourList';
import React, { Suspense } from 'react';

const TourListingsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const tourListResult = await getMyTourLists(queryString);
    const totalPages = Math.ceil(
        (tourListResult?.meta?.total || 1) / (tourListResult?.meta?.limit || 1)
    );

    console.log("tourListResult", tourListResult);
    return (
        <div>
            <TourListManagementHeader />
            <TourListFilter />
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <TourListTable tourLists={tourListResult?.data || []} />
                <TablePagination
                    currentPage={tourListResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default TourListingsPage;