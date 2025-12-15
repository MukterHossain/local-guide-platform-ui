import ClearFiltersButton from '@/components/shared/ClearFiltersButton';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import React from 'react';

const BookingFilter = () => {
    return (
        <div className="space-y-3">
      {/* Row 1: Search and Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search admins..." />
        <RefreshButton />
      </div>

      {/* Row 2: Filter Controls */}
      <div className="flex items-center gap-3">
        {/* Email Filter */}
        <SearchFilter paramName="status" placeholder="Status" />

       
        <ClearFiltersButton />
      </div>
    </div>
    );
};

export default BookingFilter;