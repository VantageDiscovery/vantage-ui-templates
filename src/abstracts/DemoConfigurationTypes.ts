import { EFiltersType, Filter } from "./FilterTypes";
import {
  CDNAPIConfiguration,
  CDNAPIConfigurationClient,
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
    customerAPI:
      | VantageAPIConfigurationClient
      | CustomAPIConfiguration
      | CDNAPIConfigurationClient;
  };

export interface BrandingConfiguration {
  colors: {
    primary: string;
    secondary: string;
  };
  logoUrl: string;
  title?: string;
  searchPlaceholder?: string;
  originalSearchResultsURL?: string;
  pageTitle: string;
}

export interface DataConfiguration {
  vantageSearchURL: string;
  accountId: string;
  collectionIds: string[];
  apiKey: string;
  defaultAccuracy: string;
  defaultSearchQuery: string;
  customerAPI:
    | VantageAPIConfiguration
    | CustomAPIConfiguration
    | CDNAPIConfiguration;
  filter: FilterConfiguration;
  shingling: ShinglingConfiguration;
  pageNumber?: number;
  pageSize?: number;
}

export interface FilterConfiguration {
  type: EFiltersType;
  getPopularFilters?: (filters: Filter[]) => Filter[];
}

interface ShinglingConfiguration {
  document_match_score_weight: string;
  query_match_score_weight: string;
  cosine_similarity_score_weight: string;
}
