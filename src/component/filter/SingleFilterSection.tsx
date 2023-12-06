import React from "react";
import Chip from "./Chip";
import { Filter, UseFiltersType } from "abstracts/FilterTypes";

const SingleFilterSection = ({
  useFilters,
}: {
  useFilters: UseFiltersType;
}) => {
  const { activeFilters, toggleFilters, popularFilters } = useFilters;
  const activeFilter = activeFilters[0];

  const isFilterActive = (filter: Filter): boolean => {
    return filter.name === activeFilter?.name;
  };

  if (popularFilters.length === 0) {
    return <span />;
  }

  return (
    <span className="px-24 flex w-full py-1 gap-4 items-center justify-between">
      <span className="flex items-center gap-6">
        <p className="text-lg font-semibold whitespace-nowrap">
          Most popular categories:
        </p>
        <span className="flex flex-wrap gap-4">
          {popularFilters.map((filter) => (
            <Chip
              key={`${filter.name}`}
              title={filter.name}
              isSelected={isFilterActive(filter)}
              onClick={() => toggleFilters([filter])}
            />
          ))}
        </span>
      </span>
    </span>
  );
};

export default SingleFilterSection;
