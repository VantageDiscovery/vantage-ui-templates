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
}

export interface SearchParameters {
  accuracy: string;
  pageNumber: number;
  pageSize: number;
}

export type SearchMoreLikeThisParameters = SearchParameters & {
  documentId: string;
};

export type SearchByQueryParameters = SearchParameters &
  ShinglingParameters &
  FieldValueWeightingParameters & {
    filters: string;
    query: string;
  };

export type SearchMoreLikeTheseParameters = SearchMoreLikeThisParameters & {
  filters: string;
  these: MoreLikeTheseParameters[];
  vibe_overall_weight?: number;
};

export type MoreLikeTheseParameters = {
  query_document_id?: string;
  query_text?: string;
  weight?: number;
};

export type ShinglingParameters = {
  cosineSimilarityScoreWeight: number;
  queryMatchScoreWeight: number;
  documentMatchScoreWeight: number;
};

type FieldValueWeightingParameters = {
  queryKeyWordWeightingMode: string;
  queryKeyWordMaxOverallWeight: number;
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
    cosine_similarity_score_weight: number;
    query_match_score_weight: number;
    document_match_score_weight: number;
  };
  filter?: {
    boolean_filter: string;
  };
  document_id?: string;
  text?: string;
  field_value_weighting?: {
    query_key_word_weighting_mode: string;
    query_key_word_max_overall_weight: number;
  };
  these?: {
    query_document_id?: string;
    query_text?: string;
    weight?: number;
  }[];
}
