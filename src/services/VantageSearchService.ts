import {
  SearchProductConfiguration,
  SearchByQueryParameters,
  VantageSearchProductResults,
  VantageSearchProductResultsDTO,
  SearchMoreLikeThisParameters,
} from "abstracts/VantageTypes";
import axios, { AxiosResponse } from "axios";
import config from "config";
import {
  TransformVantageSearchProductByQueryParametersViewToDTO,
  TransformVantageSearchResultsDTOToView,
  TransformVantageSearchProductMoreLikeThisParametersViewToDTO,
} from "transformers/VantageProductTransformers";

const MORE_LIKE_THIS_PATH = `${config.vantageSearchURL}/morelikethis`;
const SEARCH_BY_QUERY_PATH = `${config.vantageSearchURL}/semantic`;

const searchByQuery = async (
  searchConfiguration: SearchProductConfiguration,
  searchParameters: SearchByQueryParameters
): Promise<VantageSearchProductResults> => {
  return axios
    .post(
      `${SEARCH_BY_QUERY_PATH}/`,
      TransformVantageSearchProductByQueryParametersViewToDTO(
        searchConfiguration,
        searchParameters
      ),
      { headers: { Authorization: searchConfiguration.apiKey } }
    )
    .then((response: AxiosResponse<VantageSearchProductResultsDTO>) =>
      TransformVantageSearchResultsDTOToView(response.data)
    );
};

const searchMoreLikeThis = async (
  searchConfiguration: SearchProductConfiguration,
  searchParameters: SearchMoreLikeThisParameters
): Promise<VantageSearchProductResults> => {
  return axios
    .post(
      `${MORE_LIKE_THIS_PATH}/`,
      TransformVantageSearchProductMoreLikeThisParametersViewToDTO(
        searchConfiguration,
        searchParameters
      ),
      { headers: { Authorization: searchConfiguration.apiKey } }
    )
    .then((response: AxiosResponse<VantageSearchProductResultsDTO>) =>
      TransformVantageSearchResultsDTOToView(response.data)
    );
};

const VantageSearchService = {
  searchByQuery,
  searchMoreLikeThis,
};

export default VantageSearchService;
