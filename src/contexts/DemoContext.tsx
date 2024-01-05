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
import useUrlParams from "hooks/useUrlParams";
import {
  CollectionSearchResult,
  DemoContextType,
} from "abstracts/DemoContextTypes";

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
  const [query, setQuery] = useState<string>(search);
  const [isDeveloperViewToggled, setIsDeveloperViewToggled] =
    useState<boolean>(false);

  const multiQuerySearchResults = VantageSearchQueries.useSearchByConfiguration(
    dataConfiguration.collectionIds.map((collectionId: string) => ({
      apiKey: dataConfiguration.apiKey,
      customerId: dataConfiguration.accountId,
      customerNamespace: collectionId,
      shingling: dataConfiguration.shingling,
    })),
    {
      query: search.length > 0 ? search : dataConfiguration.defaultSearchQuery,
      accuracy: dataConfiguration.defaultAccuracy,
      filters: filterHandlers.getFilterString(),
      pageNumber: dataConfiguration.pageNumber || DEFAULT_PAGE_NUMBER,
      pageSize: dataConfiguration.pageSize || DEFAULT_PAGE_SIZE,
    },
    {
      getItemsByIds: customerAPI.getItemsByIds,
    }
  );

  const multiMLTSearchResults =
    VantageSearchQueries.useMoreLikeThisByConfiguration(
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

  const collectionSearchResults: CollectionSearchResult[] = useMemo(() => {
    let activeSearchResult = multiQuerySearchResults;
    if (moreLikeDocumentId) {
      activeSearchResult = multiMLTSearchResults;
    }
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
  }, [multiQuerySearchResults, multiMLTSearchResults]);

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

  useEffect(() => {
    setMoreLikeDocumentId("");
    refetchSearchQueryResults();
  }, [filterHandlers.activeFilters]);

  useEffect(() => {
    search.length > 0
      ? (setQuery(search), refetchSearchQueryResults())
      : (documentId.length === 0 &&
          setQuery(dataConfiguration.defaultSearchQuery),
        refetchSearchQueryResults());
  }, [search]);

  useEffect(() => {
    setMoreLikeDocumentId(documentId ?? "");
    documentId.length > 0
      ? (refetchMLTSearchResults(), setQuery(documentId))
      : (search.length > 0 && setQuery(search), refetchSearchQueryResults());
  }, [documentId]);

  return (
    <DemoContext.Provider
      value={{
        filterActions: filterHandlers,
        searchResults: collectionSearchResults,
        demoActions: {
          performSearch: () => {
            setMoreLikeDocumentId("");
            setUrlSearchParameter(query);
          },
          performMoreLikeThis: (id: string) => {
            setUrlDocumentId(id);
            setMoreLikeDocumentId(id);
            setQuery(id);
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
