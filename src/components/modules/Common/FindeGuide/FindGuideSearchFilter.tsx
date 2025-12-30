"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


interface FindGuideSearchFilterProps {
    category: Array<{id:string, name:string}>
}
const FindGuideSearchFilter = ({category}: FindGuideSearchFilterProps) => {
      const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state once from URL, but don't re-sync on every searchParams change
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        new URLSearchParams(window.location.search).get("searchTerm") || ""
      );
    }
    return "";
  });

    const debouncedSearch = useDebounce(searchTerm, 500);

    
  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search);

      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // Reset to page 1 when filters change
      params.delete("page");

      router.push(`/find-guide?${params.toString()}`);
    },
    [router]
  );

  useEffect(() => {
    const urlSearchTerm =
      new URLSearchParams(window.location.search).get("searchTerm") || "";
    if (debouncedSearch !== urlSearchTerm) {
      updateFilters("searchTerm", debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleClearFilters = () => {
    setSearchTerm("");
    router.push("/find-guide");
  };

  const hasActiveFilters =
    searchParams.get("searchTerm") || searchParams.get("category");


    return (
        <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Specialty Filter */}
        {/* <Select
          value={searchParams.get("specialties") || "all"}
          onValueChange={(value) => updateFilters("specialties", value)}
        >
          <SelectTrigger className="w-full md:w-[250px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            {category.map((specialty) => (
              <SelectItem key={specialty.id} value={specialty.name}>
                {specialty.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        {/* Gender Filter */}
        {/* <Select
          value={searchParams.get("gender") || "all"}
          onValueChange={(value) => updateFilters("gender", value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
          </SelectContent>
        </Select> */}

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full md:w-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
    );
};

export default FindGuideSearchFilter;