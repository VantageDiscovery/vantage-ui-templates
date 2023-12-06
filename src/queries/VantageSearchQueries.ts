import { useQuery } from "@tanstack/react-query";
import { CustomerDataHandler, Item } from "abstracts/ItemTypes";
import {
  SearchByQueryParameters,
  SearchMoreLikeThisParameters,
  SearchProductConfiguration,
  VantageSearchProductResults,
  VantageSearchResultDTO,
} from "abstracts/VantageTypes";
import VantageSearchService from "services/VantageSearchService";

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
};

const getItemsWithScores = async (
  vantageSearchResults: VantageSearchResultDTO[],
  getItemsFunction: () => Promise<Omit<Item, "score">[]>
): Promise<Item[]> => {
  const getItemScoreById = (id: string): number => {
    const foundItem = vantageSearchResults.find(
      (searchResult) => id === searchResult.id
    );
    return foundItem?.score || 0;
  };
  const customerItems: Omit<Item, "score">[] = await getItemsFunction();
  const customerItemsWithScores: Item[] = customerItems.map((item) => ({
    ...item,
    score: getItemScoreById(item.id),
  }));
  return customerItemsWithScores;
};

/**
 * Performs Vantage Search then it performs getItemsByIds from customerDataHandler.
 *
 * @param searchConfiguration Search configuration that is customer only related.
 * @param searchParameters A parameters send to Broker to retrieve results.
 * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
 * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
 */
const useSearchByConfiguration = (
  searchConfiguration: SearchProductConfiguration,
  searchParameters: SearchByQueryParameters,
  customerDataHandler: CustomerDataHandler
) =>
  useQuery<[number, Item[]], Error>({
    queryKey: queryKeys.searchByQuery(
      searchConfiguration.customerId,
      searchConfiguration.customerNamespace
    ),
    queryFn: async () => {
      const vantageSearchResults: VantageSearchProductResults =
        await VantageSearchService.searchByQuery(
          searchConfiguration,
          searchParameters
        );
      const getItemsByIdsFunction = customerDataHandler.getItemsByIds.bind(
        undefined,
        vantageSearchResults.results.map((result) => result.id)
      );

      const customerItems = await getItemsWithScores(
        vantageSearchResults.results,
        vantageSearchResults.results.length > 0
          ? getItemsByIdsFunction
          : () => Promise.resolve([])
      );

      return [vantageSearchResults.executionTime, customerItems];
    },
  });

/**
 * Performs Vantage More Like This and then it performs getItemsByIds from customerDataHandler.
 *
 * @param searchConfiguration Search configuration that is customer only related.
 * @param searchParameters A parameters send to Broker to retrieve results.
 * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
 * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
 */
const useMoreLikeThisByConfiguration = (
  searchConfiguration: SearchProductConfiguration,
  searchParameters: SearchMoreLikeThisParameters,
  customerDataHandler: CustomerDataHandler
) =>
  useQuery<[number, Item[]], Error>({
    queryKey: queryKeys.seachMoreLikeThis(
      searchConfiguration.customerId,
      searchConfiguration.customerNamespace
      //TODO: Change key according to docid.
    ),
    queryFn: async () => {
      const vantageSearchResults: VantageSearchProductResults =
        await VantageSearchService.searchMoreLikeThis(
          searchConfiguration,
          searchParameters
        );
      const getItemsByIdsFunction = customerDataHandler.getItemsByIds.bind(
        undefined,
        vantageSearchResults.results.map((result) => result.id)
      );

      const customerItems = await getItemsWithScores(
        vantageSearchResults.results,
        vantageSearchResults.results.length > 0
          ? getItemsByIdsFunction
          : () => Promise.resolve([])
      );

      return [vantageSearchResults.executionTime, customerItems];
    },
    enabled: !!searchParameters.documentId,
  });

export const VantageSearchQueries = {
  useSearchByConfiguration,
  useMoreLikeThisByConfiguration,
};
