import CategoryFilter from "@/components/modules/Admin/CategoryManagement/CategoryFilter";
import CategoryManagementHeader from "@/components/modules/Admin/CategoryManagement/CategoryManagementHeader";
import CategoryTable from "@/components/modules/Admin/CategoryManagement/CategoryTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getCategory } from "@/services/admin/categoryManagement";
import { Suspense } from "react";

const CategoriesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const categoryResult = await getCategory(queryString);
    const totalPages = Math.ceil(
        (categoryResult?.meta?.total || 1) / (categoryResult?.meta?.limit || 1)
    );
    return (
        <div>
            <CategoryManagementHeader />
            <CategoryFilter />
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <CategoryTable category={categoryResult?.data || []} />
                <TablePagination
                    currentPage={categoryResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default CategoriesPage;