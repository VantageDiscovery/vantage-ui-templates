import {
  SearchConfiguration,
  SearchParameters,
  SearchParametersDTO,
  SearchByQueryParameters,
  SearchMoreLikeThisParameters,
  VantageSearchResultDTO,
  VantageSearchResult,
  VantageSearchResponseDTO,
  VantageSearchResponse,
  SearchMoreLikeTheseParameters,
  MoreLikeTheseParameters,
} from "abstracts/VantageTypes";
import { BoardData } from "abstracts/VibeTypes";

export const TransformVantageSearchParametersViewToDTO = (
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchParameters
): SearchParametersDTO => {
  return {
    request_id: 333_666,
    collection: {
      account_id: searchConfiguration.customerId,
      collection_id: searchConfiguration.customerNamespace,
      accuracy: searchParameters.accuracy,
    },
    pagination: {
      page: searchParameters.pageNumber,
      count: searchParameters.pageSize,
    },
  };
};

export const TransformVantageSearchByQueryParametersViewToDTO = (
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchByQueryParameters
): SearchParametersDTO => {
  return {
    ...TransformVantageSearchParametersViewToDTO(
      searchConfiguration,
      searchParameters
    ),
    text: searchParameters?.query,
    filter: {
      boolean_filter:
        searchParameters.filters === "()" ? "" : searchParameters.filters,
    },
    shingling: {
      cosine_similarity_score_weight:
        searchParameters.cosineSimilarityScoreWeight,
      document_match_score_weight: searchParameters.documentMatchScoreWeight,
      query_match_score_weight: searchParameters.queryMatchScoreWeight,
    },
  };
};

export const TransformVantageSearchMoreLikeThisParametersViewToDTO = (
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeThisParameters
): SearchParametersDTO => {
  return {
    ...TransformVantageSearchParametersViewToDTO(
      searchConfiguration,
      searchParameters
    ),
    document_id: searchParameters.documentId,
    // TODO: delete once it is removed on backend
    filter: {
      boolean_filter: "",
    },
  };
};

export const TransformVantageSearchMoreLikeTheseParametersViewToDTO = (
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeTheseParameters
): SearchParametersDTO => {
  return {
    ...TransformVantageSearchParametersViewToDTO(
      searchConfiguration,
      searchParameters
    ),
    these: searchParameters.these,
    // TODO: delete once it is removed on backend
    document_id: "0",
    filter: {
      boolean_filter:
        searchParameters.filters === "()" ? "" : searchParameters.filters,
    },
  };
};

export const transformToAddWeightToThese = ({
  these,
  document_id,
  query,
  vibe_overall_weight = 0,
}: {
  these: BoardData[];
  document_id: string;
  query: string;
  vibe_overall_weight?: number;
}): MoreLikeTheseParameters[] => {
  const firstParameter =
    document_id.length > 0
      ? { query_document_id: document_id }
      : { query_text: query };
  return [
    { ...firstParameter, weight: 1 - vibe_overall_weight },
    ...these.map((data) => {
      return {
        query_text: data.text,
        weight: (1 / these.length) * vibe_overall_weight,
      };
    }),
  ];
};

export const TransformVantageSearchResultDTOToView = (
  searchResult: VantageSearchResultDTO
): VantageSearchResult => {
  return {
    id: searchResult.id,
    score: searchResult.score,
  };
};

export const TransformVantageSearchResponseDTOToView = (
  responseDTO: VantageSearchResponseDTO
): VantageSearchResponse => {
  return {
    results: responseDTO.results.map((searchResult) =>
      TransformVantageSearchResultDTOToView(searchResult)
    ),
    executionTime: responseDTO.execution_time,
  };
};
