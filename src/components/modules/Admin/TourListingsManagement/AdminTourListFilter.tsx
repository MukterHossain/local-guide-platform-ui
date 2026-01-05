import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const AdminTouristListFilter = () => {
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
        <SearchFilter paramName="title" placeholder="Title" />
        <SearchFilter paramName="description" placeholder="Description" />
        <SearchFilter paramName="durationHours" placeholder="Duration (hours)" />
        <SearchFilter paramName="city" placeholder="City" />
        <ClearFiltersButton />
      </div>
    </div>
    );
};

export default AdminTouristListFilter;