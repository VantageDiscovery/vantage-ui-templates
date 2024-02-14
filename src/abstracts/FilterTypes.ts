export enum EFiltersType {
  SINGLE_SELECT = "single select",
  MULTI_SELECT = "multi select",
}
export interface Filter {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
}

export type UseFiltersType = {
  availableFilters: Filter[];
  activeFilters: Filter[];
  popularFilters: Filter[];
  setActiveFilters: (filters: Filter[]) => void;
  toggleFilters: (filters: Filter[]) => void;
  getFilterString: () => string;
  clearActiveFilters: () => void;
};
