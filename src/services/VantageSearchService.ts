import {
  SearchConfiguration,
  SearchByQueryParameters,
  VantageSearchResponse,
  VantageSearchResponseDTO,
  SearchMoreLikeThisParameters,
  SearchMoreLikeTheseParameters,
} from "abstracts/VantageTypes";
import axios, { AxiosResponse } from "axios";
import {
  TransformVantageSearchByQueryParametersViewToDTO,
  TransformVantageSearchResponseDTOToView,
  TransformVantageSearchMoreLikeThisParametersViewToDTO,
  TransformVantageSearchMoreLikeTheseParametersViewToDTO,
} from "transformers/VantageProductTransformers";

const searchByQuery = async (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchByQueryParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${vantageSearchURL}/semantic/`,
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
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeThisParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${vantageSearchURL}/morelikethis/`,
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

const searchMoreLikeThese = async (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeTheseParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${vantageSearchURL}/morelikethese/`,
      TransformVantageSearchMoreLikeTheseParametersViewToDTO(
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
  searchMoreLikeThese,
};

export default VantageSearchService;
