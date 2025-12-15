import TourCategoryFilter from "@/components/modules/Admin/TourCategory/TourCategoryFilter";
import TourCategoryManagementHeader from "@/components/modules/Admin/TourCategory/TourCategoryManagementHeader";
import TourCategoryTable from "@/components/modules/Admin/TourCategory/TourCategoryTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTourCategories } from "@/services/admin/tourCategoryManagement";
import { Suspense } from "react";

const TourCategoryPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const tourCategoryResult = await getAllTourCategories(queryString);
    const totalPages = Math.ceil(
        (tourCategoryResult?.meta?.total || 1) / (tourCategoryResult?.meta?.limit || 1)
    );
    return (
        <div>
            <TourCategoryManagementHeader/>
        <TourCategoryFilter />
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <TourCategoryTable tourCategory={tourCategoryResult?.data || []} />
                <TablePagination
                    currentPage={tourCategoryResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default TourCategoryPage;