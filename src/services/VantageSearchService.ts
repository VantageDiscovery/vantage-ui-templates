import {
  SearchConfiguration,
  SearchByQueryParameters,
  VantageSearchResponse,
  VantageSearchResponseDTO,
  SearchMoreLikeThisParameters,
  SearchMoreLikeTheseParameters,
  SearchVibeParameters,
} from "abstracts/VantageTypes";
import axios, { AxiosResponse } from "axios";
import {
  TransformVantageSearchByQueryParametersViewToDTO,
  TransformVantageSearchResponseDTOToView,
  TransformVantageSearchMoreLikeThisParametersViewToDTO,
  TransformVantageSearchMoreLikeTheseParametersViewToDTO,
  TransformVantageSearchVibeParametersViewToDTO,
} from "transformers/VantageProductTransformers";

const searchByQuery = async (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchByQueryParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${vantageSearchURL}/${searchConfiguration.customerId}/${searchConfiguration.customerNamespace}/semantic/`,
      TransformVantageSearchByQueryParametersViewToDTO(
        searchConfiguration,
        searchParameters
      ),
      { headers: { Authorization: searchConfiguration.apiKey } }
    )
    .then((response: AxiosResponse<VantageSearchResponseDTO>) =>
      TransformVantageSearchResponseDTOToView(
        response.data,
        !searchParameters.experimental?.fields
      )
    );
};

const searchMoreLikeThis = async (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeThisParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${vantageSearchURL}/${searchConfiguration.customerId}/${searchConfiguration.customerNamespace}/morelikethis/`,
      TransformVantageSearchMoreLikeThisParametersViewToDTO(
        searchConfiguration,
        searchParameters
      ),
      { headers: { Authorization: searchConfiguration.apiKey } }
    )
    .then((response: AxiosResponse<VantageSearchResponseDTO>) =>
      TransformVantageSearchResponseDTOToView(
        response.data,
        !searchParameters.experimental?.fields
      )
    );
};

const searchMoreLikeThese = async (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeTheseParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${vantageSearchURL}/${searchConfiguration.customerId}/${searchConfiguration.customerNamespace}/morelikethese/`,
      TransformVantageSearchMoreLikeTheseParametersViewToDTO(
        searchConfiguration,
        searchParameters
      ),
      { headers: { Authorization: searchConfiguration.apiKey } }
    )
    .then((response: AxiosResponse<VantageSearchResponseDTO>) =>
      TransformVantageSearchResponseDTOToView(
        response.data,
        !searchParameters.experimental?.fields
      )
    );
};

const searchVibe = async (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchVibeParameters
): Promise<VantageSearchResponse> => {
  return axios
    .post(
      `${vantageSearchURL}/${searchConfiguration.customerId}/${searchConfiguration.customerNamespace}/vibe`,
      TransformVantageSearchVibeParametersViewToDTO(
        searchConfiguration,
        searchParameters
      ),
      { headers: { Authorization: searchConfiguration.apiKey } }
    )
    .then((response: AxiosResponse<VantageSearchResponseDTO>) =>
      TransformVantageSearchResponseDTOToView(
        response.data,
        !searchParameters.experimental?.fields
      )
    );
};

const VantageSearchService = {
  searchByQuery,
  searchMoreLikeThis,
  searchMoreLikeThese,
  searchVibe,
};

export default VantageSearchService;
