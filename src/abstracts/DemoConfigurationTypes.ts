import { Filter } from "./FilterTypes";
import { Item } from "./ItemTypes";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export enum EDemoTemplate {
  PUBLISHER,
  PRODUCT,
}

export enum EFiltersType {
  SINGLE_SELECT,
  MULTI_SELECT,
}

export type Configuration = DataConfiguration & {
  template: EDemoTemplate;
  branding: BrandingConfiguration;
};

export type ClientConfiguration = DeepPartial<
  Omit<Configuration, "collectionIds">
> &
  Pick<
    Configuration,
    "accountId" | "apiKey" | "getCustomerItems" | "vantageSearchURL" // mandatory fields
  > & { collectionId: string | string[] };

export interface BrandingConfiguration {
  colors: {
    primary: string;
    secondary: string;
  };
  logoUrl: string;
  title?: string;
  searchPlaceholder?: string;
}

export interface DataConfiguration {
  vantageSearchURL: string;
  accountId: string;
  collectionIds: string[];
  apiKey: string;
  defaultAccuracy: string;
  defaultSearchQuery: string;
  getCustomerItems: (ids: string[]) => Promise<Omit<Item, "score">[]>;
  filter: FilterConfiguration;
  pageNumber?: number;
  pageSize?: number;
}

interface FilterConfiguration {
  type: EFiltersType;
  getFilters: () => Promise<Filter[]>;
  getPopularFilters?: (filters: Filter[]) => Filter[];
}
