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
} from "abstracts/VantageTypes";

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
    // todo: delete once it is removed on backend
    filter: {
      boolean_filter: "",
    },
  };
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
