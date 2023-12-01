import { useState } from "react";
import { Filter } from "../abstracts/FilterTypes";

const useFilters = (): {
  activeFilters: Filter[];
  toggleFilters: (filters: Filter[]) => void;
  getBooleanFilterString: (filters: Filter[]) => string;
  clearActiveFilters: () => void;
} => {
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  const toggleFilters = (filters: Filter[]): void => {
    const [activatedFilters, deactivatedFilters] = filters.reduce(
      (previous: Array<Filter[]>, current: Filter) => {
        const spotInIndex = activeFilters.includes(current) ? 1 : 0;
        previous[spotInIndex].push(current);
        return previous;
      },
      [[], []]
    );
    setActiveFilters([
      ...activeFilters.filter(
        (selected) => !deactivatedFilters.includes(selected)
      ),
      ...activatedFilters,
    ]);
  };

  const getBooleanFilterString = (filters: Filter[]): string => {
    const orSets = filters.reduce((reducer, currentFilter) => {
      if (!reducer[currentFilter.slug]) {
        reducer[currentFilter.slug] = [];
      }
      reducer[currentFilter.slug].push(
        // eslint-disable-next-line no-useless-escape
        `${currentFilter.slug}:\"${currentFilter.name}\"`
      );
      return reducer;
    }, {} as Record<string, string[]>);

    const filter = Object.keys(orSets)
      .map((key) => `(${orSets[key].join(" OR ")})`)
      .join(" AND ");

    return filter.includes("AND") ? `(${filter})` : filter;
  };

  const clearActiveFilters = () => {
    setActiveFilters([]);
  };

  return {
    activeFilters,
    toggleFilters,
    getBooleanFilterString,
    clearActiveFilters,
  };
};

export default useFilters;
