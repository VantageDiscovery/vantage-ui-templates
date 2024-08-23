import { UseMutationResult, useMutation } from "@tanstack/react-query";
import {
  CustomerDataHandler,
  Item,
  ItemWithoutScore,
} from "../abstracts/ItemTypes";
import {
  SearchByQueryParameters,
  SearchMoreLikeThisParameters,
  SearchConfiguration,
  VantageSearchResponse,
  VantageSearchResult,
  SearchMoreLikeTheseParameters,
} from "../abstracts/VantageTypes";
import { KeyWordWeightingQuery } from "../abstracts/KeyWordTypes";
import VantageSearchService from "../services/VantageSearchService";
import { Action } from "../abstracts/ActiveResultTypes";

const queryKeys = {
  seachMoreLikeThis: (customerId: string, customerNamespace: string) => [
    "SEARCH_MORE_LIKE_THIS",
    customerId,
    customerNamespace,
  ],
  searchByQuery: (customerId: string, customerNamespace: string) => [
    "SEARCH_BY_QUERY",
    customerId,
    customerNamespace,
  ],
  seachMoreLikeThese: (customerId: string, customerNamespace: string) => [
    "SEARCH_MORE_LIKE_THESE",
    customerId,
    customerNamespace,
  ],
};

const getItemsWithScores = async (
  vantageSearchResults: VantageSearchResult[],
  getItemsFunction: () => Promise<ItemWithoutScore[]>
): Promise<Item[]> => {
  const getItemScoreById = (id: string): number => {
    const foundItem = vantageSearchResults.find(
      (searchResult) => id === searchResult.id
    );
    return foundItem?.score || 0;
  };
  const customerItems: ItemWithoutScore[] = await getItemsFunction();
  const customerItemsWithScores: Item[] = customerItems.map(
    (item: ItemWithoutScore) => ({
      ...item,
      score: getItemScoreById(item.id),
    })
  );
  return customerItemsWithScores;
};

const useSearchMutationByConfiguration = (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchByQueryParameters,
  customerDataHandler: CustomerDataHandler,
  setActiveResult: (result: Action) => void,
  activeResult: Action,
  keyWordWeightingQuery?: KeyWordWeightingQuery
): UseMutationResult<[number, Item[]], Error> => {
  return useMutation({
    mutationKey: queryKeys.searchByQuery(
      searchConfiguration.customerId,
      searchConfiguration.customerNamespace
    ),
    mutationFn: async () => {
      const searchParametersWithFieldValue = keyWordWeightingQuery
        ? {
            ...searchParameters,
            keyWordWeightingQuery: {
              ...keyWordWeightingQuery,
              query: searchParameters.query,
            },
          }
        : searchParameters;

      const response: VantageSearchResponse =
        await VantageSearchService.searchByQuery(
          vantageSearchURL,
          searchConfiguration,
          searchParametersWithFieldValue
        );

      if (searchParameters?.experimental?.fields) {
        return [response.executionTime, response.results as Item[]];
      }

      const getItemsByIdsFunction = customerDataHandler.getItemsByIds.bind(
        undefined,
        searchParameters?.experimental?.fields
          ? response.results
          : response.results.map((result) => result.id)
      );
      const customerItems = await getItemsWithScores(
        response.results,
        response.results.length > 0
          ? getItemsByIdsFunction
          : () => Promise.resolve([])
      );
      customerItems.sort((itemA, itemB) => itemB.score - itemA.score);

      return [response.executionTime, customerItems];
    },
    onMutate: () => setActiveResult(activeResult),
  });
};

const useMoreLikeThisByConfiguration = (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeThisParameters,
  customerDataHandler: CustomerDataHandler,
  setActiveResult: (result: Action) => void,
  activeResult: Action
): UseMutationResult<[number, Item[]], Error> => {
  return useMutation({
    mutationKey: queryKeys.seachMoreLikeThis(
      searchConfiguration.customerId,
      searchConfiguration.customerNamespace
    ),
    mutationFn: async () => {
      const response: VantageSearchResponse =
        await VantageSearchService.searchMoreLikeThis(
          vantageSearchURL,
          searchConfiguration,
          searchParameters
        );

      if (searchParameters?.experimental?.fields) {
        return [response.executionTime, response.results as Item[]];
      }

      const getItemsByIdsFunction = customerDataHandler.getItemsByIds.bind(
        undefined,
        response.results.map((result) => result.id)
      );

      const customerItems = await getItemsWithScores(
        response.results,
        response.results.length > 0
          ? getItemsByIdsFunction
          : () => Promise.resolve([])
      );
      customerItems.sort((itemA, itemB) => itemB.score - itemA.score);

      return [response.executionTime, customerItems];
    },
    onMutate: () => setActiveResult(activeResult),
  });
};

const useMoreLikeTheseByConfiguration = (
  vantageSearchURL: string,
  searchConfiguration: SearchConfiguration,
  searchParameters: SearchMoreLikeTheseParameters,
  customerDataHandler: CustomerDataHandler,
  setActiveResult: (result: Action) => void,
  activeResult: Action,
  keyWordWeightingQuery?: KeyWordWeightingQuery,
  query?: string
): UseMutationResult<[number, Item[]], Error> => {
  return useMutation({
    mutationKey: queryKeys.seachMoreLikeThese(
      searchConfiguration.customerId,
      searchConfiguration.customerNamespace
    ),
    mutationFn: async () => {
      const searchParametersWithFieldValue = keyWordWeightingQuery
        ? {
            ...searchParameters,
            keyWordWeightingQuery: { ...keyWordWeightingQuery, query },
          }
        : searchParameters;

      const response: VantageSearchResponse =
        await VantageSearchService.searchMoreLikeThese(
          vantageSearchURL,
          searchConfiguration,
          searchParametersWithFieldValue
        );

      if (searchParameters?.experimental?.fields) {
        return [response.executionTime, response.results as Item[]];
      }
      const getItemsByIdsFunction = customerDataHandler.getItemsByIds.bind(
        undefined,
        response.results.map((result) => result.id)
      );

      const customerItems = await getItemsWithScores(
        response.results,
        response.results.length > 0
          ? getItemsByIdsFunction
          : () => Promise.resolve([])
      );
      customerItems.sort((itemA, itemB) => itemB.score - itemA.score);

      return [response.executionTime, customerItems];
    },
    onMutate: () => setActiveResult(activeResult),
  });
};

export const VantageSearchQueries = {
  /**
   * Performs Vantage More Like This and then it performs getItemsByIds from customerDataHandler.
   *
   * @param vantageSearchURL: Url of vantage search,
   * @param enable: True or false are queri enabled,
   * @param searchConfiguration Search configuration that is customer only related.
   * @param searchParameters A parameters send to Broker to retrieve results.
   * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
   * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
   */
  useMoreLikeThisByConfiguration,

  /**
   * Performs Vantage More Like This and then it performs getItemsByIds from customerDataHandler.
   *
   * @param vantageSearchURL: Url of vantage search,
   * @param enable: True or false are queri enabled,
   * @param searchConfiguration Search configuration that is customer only related.
   * @param searchParameters: A parameters send to Broker to retrieve results.
   * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
   * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
   */
  useMoreLikeTheseByConfiguration,
  useSearchMutationByConfiguration,
};
