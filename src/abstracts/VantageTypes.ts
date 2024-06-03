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
  sortParameters?: SortParameters;
  filters: string;
  threshold?: number;
}

export type SortParameters = {
  field: string;
  order?: "asc" | "desc";
  mode?: "field_selection" | "semantic_threshold";
  threshold?: number;
};

export type SearchMoreLikeThisParameters = SearchParameters & {
  documentId: string;
};

export type SearchByQueryParameters = SearchParameters &
  ShinglingParameters &
  FieldValueWeightingParameters & {
    query: string;
    experimental?: ExprimenatalParameters;
  };

export type SearchMoreLikeTheseParameters = SearchMoreLikeThisParameters &
  FieldValueWeightingParameters & {
    these: MoreLikeTheseParameters[];
    vibe_overall_weight?: number;
    experimental?: ExprimenatalParameters;
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
  weightedFieldValues?: {
    field: string;
    value: string;
    weight: number;
  }[];
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
    threshold?: number;
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
    query_key_word_weighting_mode: string;
    query_key_word_max_overall_weight: number;
    weighted_field_values?: {
      field: string;
      value: string;
      weight: number;
    }[];
  };
  these?: {
    query_document_id?: string;
    query_text?: string;
    weight?: number;
  }[];
  sort?: SortParameters;
}
