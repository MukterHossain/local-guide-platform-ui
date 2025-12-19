import AvailabilityFilter from "@/components/modules/Guide/AvailabilityManagement/AvailabilityFilter";
import AvailabilityManagementHeader from "@/components/modules/Guide/AvailabilityManagement/AvailabilityManagementHeader";
import AvailabilityTable from "@/components/modules/Guide/AvailabilityManagement/AvailabilityTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAvailables } from "@/services/guide/guideAvailable";
import { Suspense } from "react";

const AvailabiltyPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const availableResult = await getAvailables(queryString);
    const totalPages = Math.ceil(
        (availableResult?.meta?.total || 1) / (availableResult?.meta?.limit || 1)
    );

    console.log("availableResult", availableResult);
    return (
        <div>
            <AvailabilityManagementHeader />
            <AvailabilityFilter />
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <AvailabilityTable availabilities={availableResult?.data || []} />
                <TablePagination
                    currentPage={availableResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AvailabiltyPage;