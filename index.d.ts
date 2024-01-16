/// <reference types="react" />
import * as react from 'react';
import { Dispatch } from 'react';

declare enum EFiltersType {
    SINGLE_SELECT = 0,
    MULTI_SELECT = 1
}
interface Filter {
    name: string;
    slug: string;
    categoryName: string;
    categorySlug: string;
}
type UseFiltersType = {
    availableFilters: Filter[];
    activeFilters: Filter[];
    popularFilters: Filter[];
    setActiveFilters: (filters: Filter[]) => void;
    toggleFilters: (filters: Filter[]) => void;
    getFilterString: () => string;
    clearActiveFilters: () => void;
};

type Item = ItemMandatoryFields & {
    meta?: OptionalMetaFields;
};
type ItemMandatoryFields = {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    embeddingText: string;
    score: number;
    externalUrl: string;
};
type OptionalMetaFields = {
    subtitle: string;
    imageLabel: string;
};
type ItemWithoutScore = Omit<Item, "score">;
type ItemDTO = {
    id: string;
    title: string;
    description: string;
    url: string;
    image_url: string;
    text: string;
} & object;
type CustomerDataHandler = {
    getItemsByIds: (results: string[]) => Promise<ItemWithoutScore[]>;
    transformData?: (results: unknown[]) => Item[];
};

declare enum ECustomerAPIType {
    VANTAGE_API = 0,
    CUSTOM_API = 1,
    CDN_API = 2
}
type VantageAPIConfiguration = {
    type: ECustomerAPIType.VANTAGE_API;
    apiKey: string;
    apiPath: string;
    accountPrefix: string;
    collectionPrefix: string;
    getFilters: () => Promise<Filter[]>;
};
type CustomAPIConfiguration = {
    type: ECustomerAPIType.CUSTOM_API;
    getFilters: () => Promise<Filter[]>;
    getCustomerItems: (ids: string[]) => Promise<ItemDTO[]>;
};
type CDNAPIConfiguration = {
    type: ECustomerAPIType.CDN_API;
    filterURL: string[];
    itemURLPattern: string;
    authHeader: string;
};
type APIConfiguration = CustomAPIConfiguration | VantageAPIConfiguration | CDNAPIConfiguration;
type UseCustomerAPIType = {
    getItemsByIds: (id: string[]) => Promise<ItemWithoutScore[]>;
    getFilters: () => Promise<Filter[]>;
};
type VantageAPIConfigurationClient = Partial<Omit<VantageAPIConfiguration, "customFieldTransformer">> & Pick<VantageAPIConfiguration, "type" | "apiKey" | "apiPath">;
type CDNAPIConfigurationClient = Partial<Omit<CDNAPIConfiguration, "customFieldTransformer">> & Pick<CDNAPIConfiguration, "itemURLPattern" | "filterURL">;

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
type CustomFieldSpecification = {
    fieldName: string;
    transformer?: (element: string) => string;
};
type CustomFieldTransformer = Partial<Record<keyof Omit<ItemWithoutScore, "meta"> | keyof OptionalMetaFields, CustomFieldSpecification>>;
type CustomFieldTransformerClient = Partial<Record<keyof Omit<ItemWithoutScore, "meta"> | keyof OptionalMetaFields, string | CustomFieldSpecification>>;
declare enum EDemoTemplate {
    PUBLISHER = 0,
    PRODUCT = 1
}
type Configuration = DataConfiguration & {
    template: EDemoTemplate;
    branding: BrandingConfiguration;
};
type ClientConfiguration = DeepPartial<Omit<Configuration, "collectionIds" | "customerAPI">> & Pick<Configuration, "accountId" | "apiKey"> & {
    collectionId: string | string[];
} & {
    customerAPI: VantageAPIConfigurationClient | CustomAPIConfiguration | CDNAPIConfigurationClient;
    customFieldTransformer?: CustomFieldTransformerClient;
};
interface BrandingConfiguration {
    colors: {
        primary: string;
        secondary: string;
    };
    logoUrl: string;
    title?: string;
    searchPlaceholder?: string;
    pageTitle: string;
}
interface DataConfiguration {
    vantageSearchURL: string;
    accountId: string;
    collectionIds: string[];
    apiKey: string;
    defaultAccuracy: string;
    defaultSearchQuery: string;
    customerAPI: VantageAPIConfiguration | CustomAPIConfiguration | CDNAPIConfiguration;
    filter: FilterConfiguration;
    shingling: ShinglingConfiguration;
    customFieldTransformer?: CustomFieldTransformer;
    pageNumber?: number;
    pageSize?: number;
    originalSearchResultsURL?: string;
}
interface FilterConfiguration {
    type: EFiltersType;
    getPopularFilters?: (filters: Filter[]) => Filter[];
}
interface ShinglingConfiguration {
    documentMatchScoreWeight: number;
    queryMatchScoreWeight: number;
    cosineSimilarityScoreWeight: number;
}

type CollectionSearchResult = {
    collectionId: string;
    items: Item[];
    executionTime: number;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};
type DemoVariables = {
    query: string;
    isDeveloperViewToggled: boolean;
    moreLikeDocumentId: string;
};
type DemoActions = {
    performSearch: () => void;
    performMoreLikeThis: (id: string) => void;
    setQuery: Dispatch<React.SetStateAction<string>>;
    setIsDeveloperViewToggled: Dispatch<React.SetStateAction<boolean>>;
};
type DemoContextType = {
    searchResults: CollectionSearchResult[];
    variables: DemoVariables;
    dataConfiguration: DataConfiguration;
    filterActions: UseFiltersType;
    demoActions: DemoActions;
};

type UseUrlParamsType = {
    dataConfiguration: DataConfiguration;
    search: string;
    documentId: string;
};

interface VantageSearchResultDTO {
    id: string;
    score: number;
}
interface VantageSearchResult {
    id: string;
    score: number;
}
type VantageSearchResponseDTO = {
    results: VantageSearchResultDTO[];
    execution_time: number;
};
type VantageSearchResponse = {
    results: VantageSearchResult[];
    executionTime: number;
};
interface SearchConfiguration {
    customerId: string;
    customerNamespace: string;
    apiKey: string;
}
interface SearchParameters {
    accuracy: string;
    pageNumber: number;
    pageSize: number;
}
type SearchMoreLikeThisParameters = SearchParameters & {
    documentId: string;
};
type SearchByQueryParameters = SearchParameters & ShinglingParameters & {
    filters: string;
    query: string;
};
type ShinglingParameters = {
    cosineSimilarityScoreWeight: number;
    queryMatchScoreWeight: number;
    documentMatchScoreWeight: number;
};
interface SearchParametersDTO {
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

declare function generateTampleteWithConfig(configuration: ClientConfiguration): react.JSX.Element;

export { type APIConfiguration, type BrandingConfiguration, type CDNAPIConfiguration, type CDNAPIConfigurationClient, type ClientConfiguration, type CollectionSearchResult, type Configuration, type CustomAPIConfiguration, type CustomFieldSpecification, type CustomFieldTransformer, type CustomerDataHandler, type DataConfiguration, type DemoActions, type DemoContextType, type DemoVariables, ECustomerAPIType, EDemoTemplate, EFiltersType, type Filter, type FilterConfiguration, type Item, type ItemDTO, type ItemMandatoryFields, type ItemWithoutScore, type OptionalMetaFields, type SearchByQueryParameters, type SearchConfiguration, type SearchMoreLikeThisParameters, type SearchParameters, type SearchParametersDTO, type ShinglingParameters, type UseCustomerAPIType, type UseFiltersType, type UseUrlParamsType, type VantageAPIConfiguration, type VantageAPIConfigurationClient, type VantageSearchResponse, type VantageSearchResponseDTO, type VantageSearchResult, type VantageSearchResultDTO, generateTampleteWithConfig };
