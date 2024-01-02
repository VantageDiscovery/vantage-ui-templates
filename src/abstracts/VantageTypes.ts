export interface VantageSearchResultDTO {
  id: string;
  score: number;
}

export interface VantageSearchResult {
  id: string;
  score: number;
}

export type VantageSearchResponseDTO = {
  results: VantageSearchResultDTO[];
  execution_time: number;
};

export type VantageSearchResponse = {
  results: VantageSearchResult[];
  executionTime: number;
};

export interface SearchConfiguration {
  customerId: string;
  customerNamespace: string;
  apiKey: string;
  shingling: ShinglingParameters;
}

export interface SearchParameters {
  accuracy: string;
  pageNumber: number;
  pageSize: number;
}

export type SearchMoreLikeThisParameters = SearchParameters & {
  documentId: string;
};

export type SearchByQueryParameters = SearchParameters & {
  filters: string;
  query: string;
};

export type ShinglingParameters = {
  cosine_similarity_score_weight: string;
  query_match_score_weight: string;
  document_match_score_weight: string;
};

export interface SearchParametersDTO {
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
    cosine_similarity_score_weight: string;
    query_match_score_weight: string;
    document_match_score_weight: string;
  };
  filter?: {
    boolean_filter: string;
  };
  document_id?: string;
  text?: string;
}
