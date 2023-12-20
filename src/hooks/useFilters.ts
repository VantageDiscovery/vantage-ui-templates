import { EFiltersType, Filter, UseFiltersType } from "../abstracts/FilterTypes";
import { useEffect, useState } from "react";

interface FilterStrategy {
  toggleFilters(activeFilters: Filter[], toggledFilters: Filter[]): Filter[];
}

class SingleActiveFilterStrategy implements FilterStrategy {
  toggleFilters(
    activeFilters: Filter[],
    toggledFilters: Filter[] // Will have only first time always.
  ): Filter[] {
    const toggledFilter = toggledFilters[0];
    const isFilterAlreadyActivated = activeFilters.some(
      (filter) => filter.slug === toggledFilter.slug
    );
    if (isFilterAlreadyActivated) {
      // Deactivate - means there are no more actives
      return [];
    }
    return [toggledFilter];
  }
}

class MultipleActiveFiltersStrategy implements FilterStrategy {
  toggleFilters(
    activeFilters: Filter[],
    toggledFilters: Filter[] // Will have only first time always.
  ): Filter[] {
    const [activatedFilters, deactivatedFilters] = toggledFilters.reduce(
      (accumulator: [Filter[], Filter[]], current: Filter) => {
        const [activatedFiltersIndex, deactivatedFiltersIndex] = [0, 1];
        const isDeactivated = activeFilters.includes(current);
        if (isDeactivated) {
          accumulator[deactivatedFiltersIndex].push(current);
          return accumulator;
        }
        accumulator[activatedFiltersIndex].push(current);
        return accumulator;
      },
      [[], []]
    );
    return [
      // Deactivate some
      ...activeFilters.filter(
        (selected) => !deactivatedFilters.includes(selected)
      ),
      // Activate some
      ...activatedFilters,
    ];
  }
}

const FilterTypeToFilterStrategy: Record<EFiltersType, FilterStrategy> = {
  [EFiltersType.SINGLE_SELECT]: new SingleActiveFilterStrategy(),
  [EFiltersType.MULTI_SELECT]: new MultipleActiveFiltersStrategy(),
};

const useFilters = ({
  filterType,
  getAvailableFilters,
  getPopularFilters,
}: {
  filterType: EFiltersType;
  getAvailableFilters: () => Promise<Filter[]>;
  getPopularFilters?: (filters: Filter[]) => Filter[];
}): UseFiltersType => {
  const [availableFilters, setAvailableFilters] = useState<Filter[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  useEffect(() => {
    getAvailableFilters().then((filters) => {
      setAvailableFilters(filters);
    });
  }, []);

  const toggleFilters = (filters: Filter[]): void => {
    setActiveFilters(
      FilterTypeToFilterStrategy[filterType].toggleFilters(
        activeFilters,
        filters
      )
    );
  };

  const getFilterString = (): string => {
    const orSets = activeFilters.reduce((reducer, currentFilter) => {
      if (!reducer[currentFilter.categorySlug]) {
        reducer[currentFilter.categorySlug] = [];
      }
      reducer[currentFilter.categorySlug].push(
        // eslint-disable-next-line no-useless-escape
        `${currentFilter.categorySlug}:\"${currentFilter.slug}\"`
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
    availableFilters,
    popularFilters:
      availableFilters && getPopularFilters
        ? getPopularFilters(availableFilters)
        : [],
    activeFilters,
    setActiveFilters,
    toggleFilters,
    getFilterString,
    clearActiveFilters,
  };
};

export default useFilters;
