import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import useFilters from "hooks/useFilters";
import { VantageSearchQueries } from "queries/VantageSearchQueries";
import useCustomerAPI from "../hooks/useCustomerApi";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  CollectionSearchResult,
  DemoContextType,
} from "abstracts/DemoContextTypes";
import useUrlParams from "hooks/useUrlParameters";
import useVibe from "hooks/useVibe";
import { transformToAddWeightToThese } from "transformers/VantageProductTransformers";

const DemoContext = createContext<DemoContextType>({} as DemoContextType);

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUMBER = 0;

export const DemoProvider = ({
  children,
  configuration,
}: {
  children: JSX.Element;
  configuration: DataConfiguration;
}) => {
  const customerAPI = useCustomerAPI({
    dataConfiguration: configuration,
  });
  const filterHandlers = useFilters({
    filterType: configuration.filter.type,
    getAvailableFilters: customerAPI.getFilters,
    getPopularFilters: configuration.filter.getPopularFilters,
  });

  const { dataConfiguration, search, documentId, setSearchUrl, setDocumentId } =
    useUrlParams({
      dataConfiguration: configuration,
    });
  const [moreLikeDocumentId, setMoreLikeDocumentId] = useState<string>(
    documentId ?? ""
  );
  const [query, setQuery] = useState<string>(
    search.length > 0 ? search : dataConfiguration.defaultSearchQuery
  );
  const [isDeveloperViewToggled, setIsDeveloperViewToggled] =
    useState<boolean>(false);

  const vibeHandler = useVibe({
    getBoards: dataConfiguration?.vibe?.getBoards,
    vibeOverallWeightDefault: dataConfiguration.vibe?.vibe_overall_weight,
  });

  const multiQuerySearchResults = VantageSearchQueries.useSearchByConfiguration(
    dataConfiguration.vantageSearchURL,
    dataConfiguration.collectionIds.map((collectionId: string) => ({
      apiKey: dataConfiguration.apiKey,
      customerId: dataConfiguration.accountId,
      customerNamespace: collectionId,
    })),
    {
      query: query,
      accuracy: dataConfiguration.defaultAccuracy,
      filters: filterHandlers.getFilterString(),
      pageNumber: dataConfiguration.pageNumber || DEFAULT_PAGE_NUMBER,
      pageSize: dataConfiguration.pageSize || DEFAULT_PAGE_SIZE,
      ...dataConfiguration.shingling,
    },
    {
      getItemsByIds: customerAPI.getItemsByIds,
    }
  );

  const multiMLTSearchResults =
    VantageSearchQueries.useMoreLikeThisByConfiguration(
      dataConfiguration.vantageSearchURL,
      dataConfiguration.collectionIds.map((collectionId: string) => ({
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: collectionId,
      })),
      {
        documentId: moreLikeDocumentId,
        accuracy: dataConfiguration.defaultAccuracy,
        pageNumber: dataConfiguration.pageNumber || DEFAULT_PAGE_NUMBER,
        pageSize: dataConfiguration.pageSize || DEFAULT_PAGE_SIZE,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );

  const multiMLTheseSearchResults =
    VantageSearchQueries.useMoreLikeTheseByConfiguration(
      dataConfiguration.vantageSearchURL,
      dataConfiguration.collectionIds.map((collectionId: string) => ({
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: collectionId,
      })),
      {
        accuracy: dataConfiguration.defaultAccuracy,
        pageNumber: dataConfiguration.pageNumber || DEFAULT_PAGE_NUMBER,
        pageSize: dataConfiguration.pageSize || DEFAULT_PAGE_SIZE,
        filters: filterHandlers.getFilterString(),
        vibe_overall_weight: vibeHandler.slideVibeOverallWeight,
        these: transformToAddWeightToThese({
          these: vibeHandler.activeVibe,
          vibe_overall_weight: vibeHandler.slideVibeOverallWeight,
          document_id: moreLikeDocumentId,
          query,
        }),
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );

  const returnTypeOfResults = () => {
    if (vibeHandler.activeVibe?.length > 0) {
      return multiMLTheseSearchResults;
    }
    if (moreLikeDocumentId) {
      return multiMLTSearchResults;
    }
    return multiQuerySearchResults;
  };

  const collectionSearchResults: CollectionSearchResult[] = useMemo(() => {
    const activeSearchResult = returnTypeOfResults();

    return activeSearchResult.map((searchResult, index) => {
      const { data, isError, isFetching, isSuccess } = searchResult;
      return {
        items: data?.[1] ?? [],
        executionTime: data?.[0] ?? 0,
        isError,
        isLoading: isFetching,
        isSuccess,
        collectionId: configuration.collectionIds[index], // as per Tanstack useQueries configuration
      };
    });
  }, [
    multiQuerySearchResults,
    multiMLTSearchResults,
    multiMLTheseSearchResults,
  ]);

  const refetchSearchQueryResults = () => {
    for (const searchResults of multiQuerySearchResults) {
      searchResults.refetch();
    }
  };

  const refetchMLTSearchResults = () => {
    for (const searchResults of multiMLTSearchResults) {
      searchResults.refetch();
    }
  };

  const refetchMLTheseSearchResults = () => {
    for (const searchResults of multiMLTheseSearchResults) {
      searchResults.refetch();
    }
  };

  useEffect(() => {
    performMoreLikeThese();
  }, [filterHandlers.activeFilters, vibeHandler.activeVibe]);

  const performMoreLikeThese = () => {
    if (vibeHandler.activeVibe.length > 0) {
      refetchMLTheseSearchResults();
      return;
    }
    moreLikeDocumentId.length > 0
      ? refetchMLTSearchResults()
      : refetchSearchQueryResults();
  };

  const performSearch = () => {
    setMoreLikeDocumentId("");
    setSearchUrl(query);
    performMoreLikeThese();
  };

  useEffect(() => {
    moreLikeDocumentId && setDocumentId(moreLikeDocumentId);
    performMoreLikeThese();
  }, [moreLikeDocumentId]);

  return (
    <DemoContext.Provider
      value={{
        filterActions: filterHandlers,
        vibeActions: vibeHandler,
        searchResults: collectionSearchResults,
        demoActions: {
          performSearch: performSearch,
          performMoreLikeThis: (id) => {
            if (id === moreLikeDocumentId) {
              performMoreLikeThese();
            }
            setMoreLikeDocumentId(id);
          },
          setQuery,
          setIsDeveloperViewToggled,
        },
        variables: {
          query,
          isDeveloperViewToggled,
          moreLikeDocumentId,
        },
        dataConfiguration: configuration,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export default function useDemo() {
  return useContext(DemoContext);
}
