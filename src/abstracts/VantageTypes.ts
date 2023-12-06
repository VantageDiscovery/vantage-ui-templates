export interface VantageSearchResultDTO {
  id: string;
  score: number;
}

export interface VantageSearchResult {
  id: string;
  score: number;
}

export type VantageSearchProductResultsDTO = {
  results: VantageSearchResultDTO[];
  execution_time: number;
};

export type VantageSearchProductResults = {
  results: VantageSearchResultDTO[];
  executionTime: number;
};

export interface SearchProductConfiguration {
  customerId: string;
  customerNamespace: string;
  apiKey: string;
}
export interface SearchProductsParameters {
  filters: string;
  accuracy: string;
  pageNumber: number;
  pageSize: number;
}

export type SearchMoreLikeThisParameters = SearchProductsParameters & {
  documentId: string;
};

export type SearchByQueryParameters = SearchProductsParameters & {
  filters: string;
  query: string;
};
export interface SearchProductParametersDTO {
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
  filter: {
    boolean_filter: string;
  };
  document_id?: string;
  text?: string;
}
