import { useQueries, UseQueryResult } from "@tanstack/react-query";
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
import VantageSearchService from "../services/VantageSearchService";

const queryKeys = {
  seachMoreLikeThis: (
    customerId: string,
    customerNamespace: string,
    documentId: string
  ) => ["SEARCH_MORE_LIKE_THIS", customerId, customerNamespace, documentId],
  searchByQuery: (
    customerId: string,
    customerNamespace: string,
    filters: string
  ) => ["SEARCH_BY_QUERY", customerId, customerNamespace, filters],
  seachMoreLikeThese: (
    customerId: string,
    customerNamespace: string,
    documentId: string
  ) => ["SEARCH_MORE_LIKE_THESE", customerId, customerNamespace, documentId],
};

const getItemsWithScores = async (
  vantageSearchResults: VantageSearchResult[],
  getItemsFunction: () => Promise<Omit<Item, "score">[]>
): Promise<Item[]> => {
  const getItemScoreById = (id: string): number => {
    const foundItem = vantageSearchResults.find(
      (searchResult) => id === searchResult.id
    );
    return foundItem?.score || 0;
  };
  const customerItems: ItemWithoutScore[] = await getItemsFunction();
  const customerItemsWithScores: Item[] = customerItems.map((item) => ({
    ...item,
    score: getItemScoreById(item.id),
  }));
  return customerItemsWithScores;
};

const useSearchByConfiguration = (
  vantageSearchURL: string,
  searchConfigurations: SearchConfiguration[],
  searchParameters: SearchByQueryParameters,
  customerDataHandler: CustomerDataHandler
): UseQueryResult<[number, Item[]], Error>[] => {
  return useQueries({
    queries: searchConfigurations.map((searchConfiguration) => ({
      queryKey: queryKeys.searchByQuery(
        searchConfiguration.customerId,
        searchConfiguration.customerNamespace,
        searchParameters.filters
      ),
      queryFn: async () => {
        const response: VantageSearchResponse =
          await VantageSearchService.searchByQuery(
            vantageSearchURL,
            searchConfiguration,
            searchParameters
          );
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
      enabled: false,
    })),
  });
};

const useMoreLikeThisByConfiguration = (
  vantageSearchURL: string,
  enable: boolean,
  searchConfigurations: SearchConfiguration[],
  searchParameters: SearchMoreLikeThisParameters,
  customerDataHandler: CustomerDataHandler
): UseQueryResult<[number, Item[]], Error>[] =>
  useQueries({
    queries: searchConfigurations.map((searchConfiguration) => ({
      queryKey: queryKeys.seachMoreLikeThis(
        searchConfiguration.customerId,
        searchConfiguration.customerNamespace,
        searchParameters.documentId
      ),
      queryFn: async () => {
        const response: VantageSearchResponse =
          await VantageSearchService.searchMoreLikeThis(
            vantageSearchURL,
            searchConfiguration,
            searchParameters
          );
        const getItemsByIdsFunction = customerDataHandler.getItemsByIds.bind(
          undefined,
          response.results.map((result) => result.id)
        );

        if (response.results.length === 0) {
          return [response.executionTime, 0];
        }

        const customerItems = await getItemsWithScores(
          response.results,
          response.results.length > 0
            ? getItemsByIdsFunction
            : () => Promise.resolve([])
        );
        customerItems.sort((itemA, itemB) => itemB.score - itemA.score);

        return [response.executionTime, customerItems];
      },
      enabled: enable,
    })),
  });

const useMoreLikeTheseByConfiguration = (
  vantageSearchURL: string,
  enable: boolean,
  searchConfigurations: SearchConfiguration[],
  searchParameters: SearchMoreLikeTheseParameters,
  customerDataHandler: CustomerDataHandler
): UseQueryResult<[number, Item[]], Error>[] =>
  useQueries({
    queries: searchConfigurations.map((searchConfiguration) => ({
      queryKey: queryKeys.seachMoreLikeThese(
        searchConfiguration.customerId,
        searchConfiguration.customerNamespace,
        searchParameters.documentId
      ),
      queryFn: async () => {
        const response: VantageSearchResponse =
          await VantageSearchService.searchMoreLikeThese(
            vantageSearchURL,
            searchConfiguration,
            searchParameters
          );
        const getItemsByIdsFunction = customerDataHandler.getItemsByIds.bind(
          undefined,
          response.results.map((result) => result.id)
        );

        if (response.results.length === 0) {
          return [response.executionTime, 0];
        }

        const customerItems = await getItemsWithScores(
          response.results,
          response.results.length > 0
            ? getItemsByIdsFunction
            : () => Promise.resolve([])
        );
        customerItems.sort((itemA, itemB) => itemB.score - itemA.score);

        return [response.executionTime, customerItems];
      },
      enabled: enable,
    })),
  });

export const VantageSearchQueries = {
  /**
   * Performs Vantage Search then it performs getItemsByIds from customerDataHandler.
   *
   * @param vantageSearchURL: Url of vantage search,
   * @param searchConfiguration Search configuration that is customer only related.
   * @param searchParameters A parameters send to Broker to retrieve results.
   * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
   * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
   */

  useSearchByConfiguration,
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
};
