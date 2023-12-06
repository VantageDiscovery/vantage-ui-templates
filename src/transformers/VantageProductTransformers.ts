import {
  SearchProductConfiguration,
  SearchProductsParameters,
  SearchProductParametersDTO,
  SearchByQueryParameters,
  SearchMoreLikeThisParameters,
  VantageSearchResultDTO,
  VantageSearchResult,
  VantageSearchProductResultsDTO,
  VantageSearchProductResults,
} from "abstracts/VantageTypes";

export const TransformVantageSearchProductParametersViewToDTO = (
  searchProductConfiguration: SearchProductConfiguration,
  searchProductsParameters: SearchProductsParameters
): SearchProductParametersDTO => {
  return {
    request_id: 333_666,
    collection: {
      account_id: searchProductConfiguration.customerId,
      collection_id: searchProductConfiguration.customerNamespace,
      accuracy: searchProductsParameters.accuracy,
    },
    filter: {
      boolean_filter:
        searchProductsParameters.filters === "()"
          ? ""
          : searchProductsParameters.filters,
    },
    pagination: {
      page: searchProductsParameters.pageNumber,
      count: searchProductsParameters.pageSize,
    },
  };
};

export const TransformVantageSearchProductByQueryParametersViewToDTO = (
  searchProductConfiguration: SearchProductConfiguration,
  searchProductsParameters: SearchByQueryParameters
): SearchProductParametersDTO => {
  return {
    ...TransformVantageSearchProductParametersViewToDTO(
      searchProductConfiguration,
      searchProductsParameters
    ),
    text: searchProductsParameters?.query,
  };
};

export const TransformVantageSearchProductMoreLikeThisParametersViewToDTO = (
  searchProductConfiguration: SearchProductConfiguration,
  searchProductsParameters: SearchMoreLikeThisParameters
): SearchProductParametersDTO => {
  return {
    ...TransformVantageSearchProductParametersViewToDTO(
      searchProductConfiguration,
      searchProductsParameters
    ),
    document_id: searchProductsParameters.documentId,
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

export const TransformVantageSearchResultsDTOToView = (
  searchResultsDTO: VantageSearchProductResultsDTO
): VantageSearchProductResults => {
  return {
    results: searchResultsDTO.results.map((searchResult) =>
      TransformVantageSearchResultDTOToView(searchResult)
    ),
    executionTime: searchResultsDTO.execution_time,
  };
};
