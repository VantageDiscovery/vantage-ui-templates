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
    experimental?: ExprimenatalParameters;
  };

export type SearchMoreLikeTheseParameters = SearchMoreLikeThisParameters & {
  filters: string;
  these: MoreLikeTheseParameters[];
  vibe_overall_weight?: number;
};

export type MoreLikeTheseParameters = {
  query_document_id?: string;
  query_text?: string;
  query_image?: string;
  weight?: number;
};

export type ShinglingParameters = {
  cosineSimilarityScoreWeight: number;
  queryMatchScoreWeight: number;
  documentMatchScoreWeight: number;
};

export type ExprimenatalParameters = {
  cluster?: boolean;
  cache?: boolean;
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
  experimental?: {
    cluster?: boolean;
    cache?: boolean;
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
    queryKeyWordWeightingMode: string;
    queryKeyWordMaxOverallWeight: number;
  };
  these?: {
    query_document_id?: string;
    query_text?: string;
    weight?: number;
  }[];
}
