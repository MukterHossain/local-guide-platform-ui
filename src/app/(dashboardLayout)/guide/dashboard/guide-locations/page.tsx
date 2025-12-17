import GuideLocationFilter from "@/components/modules/Guide/GuideLocatilonManagement/GuideLocationFilter";
import GuideLocationManagementHeader from "@/components/modules/Guide/GuideLocatilonManagement/GuideLocationManagementHeader";
import GuideLocationTable from "@/components/modules/Guide/GuideLocatilonManagement/GuideLocationTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getGuideLocation } from "@/services/guide/guideAvailableLoacation";
import { Suspense } from "react";

const GuideLocationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
      const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);
  const guideLocationsResult = await getGuideLocation(queryString);
  const totalPages = Math.ceil(
    (guideLocationsResult?.meta?.total || 1) / (guideLocationsResult?.meta?.limit || 1)
  );

  console.log("guideLocationsResult", guideLocationsResult);
    return (
        <div>
            <GuideLocationManagementHeader/>
            <GuideLocationFilter/>
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
        {/* <SchedulesTable schedules={schedulesResult?.data || []} /> */}
        <GuideLocationTable guideLocations={guideLocationsResult?.data || []} />
        <TablePagination
          currentPage={guideLocationsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
        </div>
    );
};

export default GuideLocationPage;