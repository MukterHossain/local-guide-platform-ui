import GuideManagementHeader from "@/components/modules/Admin/GuideManagement/GuideManagementHeader";
import GuideTable from "@/components/modules/Admin/GuideManagement/GuideTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getGuides } from "@/services/admin/userManagement";
import { Suspense } from "react";

const GuidesManagementPage =async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    const queryString = queryStringFormatter(searchParamsObj);
    const guideResult = await getGuides(queryString);
    const totalPages = Math.ceil(
        (guideResult?.meta?.total || 1) / (guideResult?.meta?.limit || 1)
    );
    console.log("guide", guideResult)
    return (
        <div>
            <GuideManagementHeader />
            {/* <GuideFilter /> */}
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
                <GuideTable guides={guideResult?.data || []} />
                <TablePagination
                    currentPage={guideResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default GuidesManagementPage;