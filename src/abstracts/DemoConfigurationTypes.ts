import { EFiltersType, Filter } from "./FilterTypes";
import {
  CustomAPIConfiguration,
  VantageAPIConfiguration,
  VantageAPIConfigurationClient,
} from "./CustomerApiTypes";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export enum EDemoTemplate {
  PUBLISHER,
  PRODUCT,
}

export type Configuration = DataConfiguration & {
  template: EDemoTemplate;
  branding: BrandingConfiguration;
};

export type ClientConfiguration = DeepPartial<
  Omit<Configuration, "collectionIds" | "customerAPI">
> &
  Pick<
    Configuration,
    "accountId" | "apiKey" // mandatory fields
  > & { collectionId: string | string[] } & {
    customerAPI: VantageAPIConfigurationClient | CustomAPIConfiguration;
  };

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
  customerAPI: VantageAPIConfiguration | CustomAPIConfiguration;
  filter: FilterConfiguration;
  pageNumber?: number;
  pageSize?: number;
}

interface FilterConfiguration {
  type: EFiltersType;
  getFilters: () => Promise<Filter[]>;
  getPopularFilters?: (filters: Filter[]) => Filter[];
}
