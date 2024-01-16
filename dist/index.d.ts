import { Dispatch } from "react";
import { JSX as JSX_2 } from "react";

export declare type APIConfiguration =
  | CustomAPIConfiguration
  | VantageAPIConfiguration
  | CDNAPIConfiguration;

export declare interface BrandingConfiguration {
  colors: {
    primary: string;
    secondary: string;
  };
  logoUrl: string;
  title?: string;
  searchPlaceholder?: string;
  pageTitle: string;
}

export declare type CDNAPIConfiguration = {
  type: ECustomerAPIType.CDN_API;
  filterURL: string[];
  itemURLPattern: string;
  authHeader: string;
};

export declare type CDNAPIConfigurationClient = Partial<
  Omit<CDNAPIConfiguration, "customFieldTransformer">
> &
  // Mandatory fields
  Pick<CDNAPIConfiguration, "itemURLPattern" | "filterURL">;

export declare type ClientConfiguration = DeepPartial<
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

export declare type CollectionSearchResult = {
  collectionId: string;
  items: Item[];
  executionTime: number;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export declare type Configuration = DataConfiguration & {
  template: EDemoTemplate;
  branding: BrandingConfiguration;
};

export declare type CustomAPIConfiguration = {
  type: ECustomerAPIType.CUSTOM_API;
  getFilters: () => Promise<Filter[]>;
  getCustomerItems: (ids: string[]) => Promise<ItemDTO[]>;
};

export declare type CustomerDataHandler = {
  getItemsByIds: (results: string[]) => Promise<ItemWithoutScore[]>;
  transformData?: (results: unknown[]) => Item[];
};

export declare type CustomFieldSpecification = {
  fieldName: string;
  transformer?: (element: string) => string;
};

export declare type CustomFieldTransformer = Partial<
  Record<
    keyof Omit<ItemWithoutScore, "meta"> | keyof OptionalMetaFields,
    CustomFieldSpecification
  >
>;

export declare interface DataConfiguration {
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

export declare type DemoActions = {
  performSearch: () => void;
  performMoreLikeThis: (id: string) => void;
  setQuery: Dispatch<React.SetStateAction<string>>;
  setIsDeveloperViewToggled: Dispatch<React.SetStateAction<boolean>>;
};

export declare type DemoContextType = {
  searchResults: CollectionSearchResult[];
  variables: DemoVariables;
  dataConfiguration: DataConfiguration;
  filterActions: UseFiltersType;
  demoActions: DemoActions;
};

export declare type DemoVariables = {
  query: string;
  isDeveloperViewToggled: boolean;
  moreLikeDocumentId: string;
};

export declare enum ECustomerAPIType {
  VANTAGE_API,
  CUSTOM_API,
  CDN_API,
}

export declare enum EDemoTemplate {
  PUBLISHER,
  PRODUCT,
}

export declare enum EFiltersType {
  SINGLE_SELECT,
  MULTI_SELECT,
}

export declare interface Filter {
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
}

export declare interface FilterConfiguration {
  type: EFiltersType;
  getPopularFilters?: (filters: Filter[]) => Filter[];
}

export declare function generateTampleteWithConfig(
  configuration: ClientConfiguration
): JSX_2.Element;

export declare type Item = ItemMandatoryFields & {
  meta?: OptionalMetaFields;
};

export declare type ItemDTO = {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  text: string;
} & object;

export declare type ItemMandatoryFields = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  embeddingText: string;
  score: number;
  externalUrl: string;
};

export declare type ItemWithoutScore = Omit<Item, "score">;

export declare type OptionalMetaFields = {
  subtitle: string;
  imageLabel: string;
};

export declare type SearchByQueryParameters = SearchParameters &
  ShinglingParameters & {
    filters: string;
    query: string;
  };

export declare interface SearchConfiguration {
  customerId: string;
  customerNamespace: string;
  apiKey: string;
}

export declare type SearchMoreLikeThisParameters = SearchParameters & {
  documentId: string;
};

export declare interface SearchParameters {
  accuracy: string;
  pageNumber: number;
  pageSize: number;
}

export declare interface SearchParametersDTO {
  request_id: number;
  collection: {
    account_id: string;
    collection_id: string;
    accuracy: string;
  };
  pagination: {
    page: number;
    count: number;
  };
  shingling?: {
    cosine_similarity_score_weight: number;
    query_match_score_weight: number;
    document_match_score_weight: number;
  };
  filter?: {
    boolean_filter: string;
  };
  document_id?: string;
  text?: string;
}

declare interface ShinglingConfiguration {
  documentMatchScoreWeight: number;
  queryMatchScoreWeight: number;
  cosineSimilarityScoreWeight: number;
}

export declare type ShinglingParameters = {
  cosineSimilarityScoreWeight: number;
  queryMatchScoreWeight: number;
  documentMatchScoreWeight: number;
};

export declare type UseCustomerAPIType = {
  getItemsByIds: (id: string[]) => Promise<ItemWithoutScore[]>;
  getFilters: () => Promise<Filter[]>;
};

export declare type UseFiltersType = {
  availableFilters: Filter[];
  activeFilters: Filter[];
  popularFilters: Filter[];
  setActiveFilters: (filters: Filter[]) => void;
  toggleFilters: (filters: Filter[]) => void;
  getFilterString: () => string;
  clearActiveFilters: () => void;
};

export declare type UseUrlParamsType = {
  dataConfiguration: DataConfiguration;
  search: string;
  documentId: string;
};

export declare type VantageAPIConfiguration = {
  type: ECustomerAPIType.VANTAGE_API;
  apiKey: string;
  apiPath: string;
  accountPrefix: string; // by default taken from account
  collectionPrefix: string; // by default taken from collection
  getFilters: () => Promise<Filter[]>;
};

export declare type VantageAPIConfigurationClient = Partial<
  Omit<VantageAPIConfiguration, "customFieldTransformer">
> &
  // Mandatory fields
  Pick<VantageAPIConfiguration, "type" | "apiKey" | "apiPath">;

export declare type VantageSearchResponse = {
  results: VantageSearchResult[];
  executionTime: number;
};

export declare type VantageSearchResponseDTO = {
  results: VantageSearchResultDTO[];
  execution_time: number;
};

export declare interface VantageSearchResult {
  id: string;
  score: number;
}

export declare interface VantageSearchResultDTO {
  id: string;
  score: number;
}

export {};
