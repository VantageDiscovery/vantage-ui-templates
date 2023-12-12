import {
  SearchConfiguration,
  SearchByQueryParameters,
  VantageSearchResponse,
  VantageSearchResponseDTO,
  SearchMoreLikeThisParameters,
} from "abstracts/VantageTypes";
import axios, { AxiosResponse } from "axios";
import config from "config";
import {
  TransformVantageSearchByQueryParametersViewToDTO,
  TransformVantageSearchResponseDTOToView,
  TransformVantageSearchMoreLikeThisParametersViewToDTO,
} from "transformers/VantageProductTransformers";

const MORE_LIKE_THIS_PATH = `${config.vantageSearchURL}/morelikethis`;
const SEARCH_BY_QUERY_PATH = `${config.vantageSearchURL}/semantic`;

const searchByQuery = async (
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchByQueryParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${SEARCH_BY_QUERY_PATH}/`,
      TransformVantageSearchByQueryParametersViewToDTO(
        searchConfiguration,
        searchParameters
      ),
      { headers: { Authorization: searchConfiguration.apiKey } }
    )
    .then((response: AxiosResponse<VantageSearchResponseDTO>) =>
      TransformVantageSearchResponseDTOToView(response.data)
    );
};

const searchMoreLikeThis = async (
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeThisParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${MORE_LIKE_THIS_PATH}/`,
      TransformVantageSearchMoreLikeThisParametersViewToDTO(
        searchConfiguration,
        searchParameters
      ),
      { headers: { Authorization: searchConfiguration.apiKey } }
    )
    .then((response: AxiosResponse<VantageSearchResponseDTO>) =>
      TransformVantageSearchResponseDTOToView(response.data)
    );
};

const VantageSearchService = {
  searchByQuery,
  searchMoreLikeThis,
};

export default VantageSearchService;
