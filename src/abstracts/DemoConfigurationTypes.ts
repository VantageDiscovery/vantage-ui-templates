import { EFiltersType, Filter } from "./FilterTypes";
import {
  CDNAPIConfiguration,
  CDNAPIConfigurationClient,
  CustomAPIConfiguration,
  VantageAPIConfiguration,
  VantageAPIConfigurationClient,
} from "./CustomerApiTypes";
import { ItemWithoutScore, OptionalMetaFields } from "./ItemTypes";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type CustomFieldSpecification = {
  fieldName: string;
  transformer?: (element: string) => string;
};

export type CustomFieldTransformer = Partial<
  Record<
    keyof Omit<ItemWithoutScore, "meta"> | keyof OptionalMetaFields,
    CustomFieldSpecification
  >
>;

type CustomFieldTransformerClient = Partial<
  Record<
    keyof Omit<ItemWithoutScore, "meta"> | keyof OptionalMetaFields,
    string | CustomFieldSpecification
  >
>;

export enum EDemoTemplate {
  PUBLISHER = "publiser",
  PRODUCT = "product",
}

export type Configuration = DataConfiguration & {
  template: EDemoTemplate | string;
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
    customFieldTransformer?: CustomFieldTransformerClient;
  };

export interface BrandingConfiguration {
  colors: {
    primary: string;
    secondary: string;
  };
  logoUrl: string;
  title?: string;
  searchPlaceholder?: string;
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
  customFieldTransformer?: CustomFieldTransformer;
  pageNumber?: number;
  pageSize?: number;
  originalSearchResultsURL?: string;
}

export interface FilterConfiguration {
  type: EFiltersType;
  getPopularFilters?: (filters: Filter[]) => Filter[];
}

interface ShinglingConfiguration {
  documentMatchScoreWeight: number;
  queryMatchScoreWeight: number;
  cosineSimilarityScoreWeight: number;
}
