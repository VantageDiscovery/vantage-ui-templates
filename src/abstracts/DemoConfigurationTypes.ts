import { EFiltersType, Filter } from "./FilterTypes";
import {
  CDNAPIConfiguration,
  CDNAPIConfigurationClient,
  CustomAPIConfiguration,
  CustomerAPIConfigurationClient,
  VantageAPIConfiguration,
  VantageAPIConfigurationClient,
} from "./CustomerApiTypes";
import { ItemWithoutScore, OptionalMetaFields } from "./ItemTypes";
import { VibeBoard } from "./VibeTypes";
import { ExprimenatalParameters } from "./VantageTypes";

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
  PUBLISHER = "publisher",
  PRODUCT = "product",
  PUBLISHER_WITH_MLT_ON_GRID = "publisherWithMltOnGrid",
}

export type ETemplateString =
  | "product"
  | "publisher"
  | "publisherWithMltOnGrid";

export type Configuration = DataConfiguration & {
  template: EDemoTemplate;
  branding: BrandingConfiguration;
};

export type ClientConfiguration = DeepPartial<
  Omit<Configuration, "collectionIds" | "customerAPI" | "template">
> &
  Pick<
    Configuration,
    "accountId" | "apiKey" // mandatory fields
  > & { collectionId: string | string[] } & {
    template?: EDemoTemplate | ETemplateString;
  } & {
    customerAPI:
      | VantageAPIConfigurationClient
      | CustomerAPIConfigurationClient
      | CDNAPIConfigurationClient;
    customFieldTransformer?: CustomFieldTransformerClient;
  };

type ShinglingConfiguration = {
  documentMatchScoreWeight: number;
  queryMatchScoreWeight: number;
  cosineSimilarityScoreWeight: number;
};

type FieldValueWeightingConfiguration = {
  queryKeyWordWeightingMode: string;
  queryKeyWordMaxOverallWeight: number;
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
  fieldValueWeighting: FieldValueWeightingConfiguration;
  pageNumber: number;
  pageSize: number;
  enableMoreLikeThis: boolean;
  originalSearchResultsURL?: string;
  vibe?: VibeConfiguration;
  experimental?: ExprimenatalParameters;
}

export interface VibeConfiguration {
  getBoards: () => Promise<VibeBoard[]>;
  vibeOverallWeight?: number;
}

export interface FilterConfiguration {
  type: EFiltersType;
  getPopularFilters?: (filters: Filter[]) => Filter[];
}
