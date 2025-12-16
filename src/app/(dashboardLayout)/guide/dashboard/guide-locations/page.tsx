import GuideLocationFilter from "@/components/modules/Guide/GuideLocatilonManagement/GuideLocationFilter";
import GuideLocationManagementHeader from "@/components/modules/Guide/GuideLocatilonManagement/GuideLocationManagementHeader";
import GuideLocationTable from "@/components/modules/Guide/GuideLocatilonManagement/GuideLocationTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getLocations } from "@/services/admin/locationManagement";
import { Suspense } from "react";

const GuideLocationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
      const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);
  const locationsResult = await getLocations(queryString);
  const totalPages = Math.ceil(
    (locationsResult?.meta?.total || 1) / (locationsResult?.meta?.limit || 1)
  );
    return (
        <div>
            <GuideLocationManagementHeader/>
            <GuideLocationFilter/>
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
        {/* <SchedulesTable schedules={schedulesResult?.data || []} /> */}
        <GuideLocationTable locations={locationsResult?.data || []} />
        <TablePagination
          currentPage={locationsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
        </div>
    );
};

export default GuideLocationPage;