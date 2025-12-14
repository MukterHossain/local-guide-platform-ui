import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const TouristFilter = () => {
    return (
        <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search admins..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Filter */}
        <SearchFilter paramName="email" placeholder="Email" />
        <SearchFilter paramName="status" placeholder="Status" />
        <SearchFilter paramName="role" placeholder="Role" />
        <SearchFilter paramName="name" placeholder="Name" />
        <ClearFiltersButton />
      </div>
    </div>
    );
};

export default TouristFilter;