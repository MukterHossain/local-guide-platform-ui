import TouristManagementHeader from "@/components/modules/Admin/TouristManagement/TouristManagementHeader";
import TouristTable from "@/components/modules/Admin/TouristManagement/TouristTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getTourists } from "@/services/admin/userManagement";
import { Suspense } from "react";

const TouristManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const touristResult = await getTourists(queryString);
    const totalPages = Math.ceil(
        (touristResult?.meta?.total || 1) / (touristResult?.meta?.limit || 1)
    );
    return (
        <div>
            <TouristManagementHeader/>
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <TouristTable tourists={touristResult?.data || []} />
                <TablePagination
                    currentPage={touristResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default TouristManagementPage;