import LocationFilter from "@/components/modules/Admin/LocationManagement/LocationFilter";
import LocationManagementHeader from "@/components/modules/Admin/LocationManagement/LocationManagementHeader";
import LocationTable from "@/components/modules/Admin/LocationManagement/LocationTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getLocations } from "@/services/admin/locationManagement";
import { Suspense } from "react";

const LocationPage = async ({
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
            <LocationManagementHeader/>
            <LocationFilter/>
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
        {/* <SchedulesTable schedules={schedulesResult?.data || []} /> */}
        <LocationTable locations={locationsResult?.data || []} />
        <TablePagination
          currentPage={locationsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
            
        </div>
    );
};

export default LocationPage;