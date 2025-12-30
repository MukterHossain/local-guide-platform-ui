import FindGuideGrid from "@/components/modules/Common/FindeGuide/FindGuideGrid";
import FindGuideSearchFilter from "@/components/modules/Common/FindeGuide/FindGuideSearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getCategory } from "@/services/admin/categoryManagement";
import { getFindeGuides } from "@/services/common/findeGuide";
import { Suspense } from "react";



const FindGuidePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj)
  const [guidesResponse, setGuides] = await Promise.all([
    getFindeGuides(queryString),
    getCategory(),
  ]);

    const guides = guidesResponse?.data || [];
//   const categories = category?.data || [];
  
  
    return (
        <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find a Guide</h1>
          <p className="text-muted-foreground mt-2">
            Search and book guides for your travel needs.
          </p>
        </div>

        {/* Filters */}
        <FindGuideSearchFilter category={guides?.data} />

        {/* Doctor Grid */}
        <Suspense fallback={<TableSkeleton columns={3} />}>
          <FindGuideGrid guides={guides} />
        </Suspense>

        {/* Pagination */}
        <TablePagination
          currentPage={guidesResponse?.meta?.page || 1}
          totalPages={guidesResponse?.meta?.totalPage || 1}
        />
      </div>
    </div>
    );
};

export default FindGuidePage;