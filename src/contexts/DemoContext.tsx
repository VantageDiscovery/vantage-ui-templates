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

  const [urlSearchParameter, setUrlSearchParameter] = useState<string>();
  const [urlDocumentId, setUrlDocumentId] = useState<string>();
  const { dataConfiguration, search, documentId } = useUrlParams({
    dataConfiguration: configuration,
    search: urlSearchParameter,
    documentId: urlDocumentId,
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
      vibeHandler.activeVibe?.length > 0,
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
        vibe_overall_weight: dataConfiguration.vibe?.vibe_overall_weight,
        these: transformToAddWeightToThese(
          vibeHandler.activeVibe,
          dataConfiguration.vibe?.vibe_overall_weight ?? 0,
          moreLikeDocumentId,
          query
        ),
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
    setMoreLikeDocumentId("");
    if (
      vibeHandler.activeVibe?.length > 0 &&
      dataConfiguration.vibe?.vibe_overall_weight
    ) {
      refetchMLTheseSearchResults();
      return;
    }
    query && refetchSearchQueryResults();
  }, [filterHandlers.activeFilters]);

  useEffect(() => {
    if (search.length > 0) {
      setQuery(search);
      performSearch();
      return;
    }
    if (documentId.length > 0) {
      setMoreLikeDocumentId(documentId);
      return;
    }
  }, []);

  useEffect(() => {
    if (vibeHandler.activeVibe?.length > 0) {
      refetchMLTheseSearchResults();
      return;
    }
    moreLikeDocumentId.length > 0
      ? refetchMLTSearchResults()
      : refetchSearchQueryResults();
  }, [vibeHandler.activeVibe]);

  const performSearch = () => {
    setMoreLikeDocumentId("");
    setUrlDocumentId("");
    setUrlSearchParameter(query);
    vibeHandler.activeVibe.length > 0
      ? refetchMLTheseSearchResults()
      : refetchSearchQueryResults();
  };

  const performMoreLikeThis = (id: string) => {
    if (vibeHandler.activeVibe.length > 0) {
      refetchMLTheseSearchResults();
      return;
    }
    id.length > 0 ? refetchMLTSearchResults() : refetchSearchQueryResults();
  };

  useEffect(() => {
    setUrlDocumentId(moreLikeDocumentId);
    performMoreLikeThis(moreLikeDocumentId);
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
