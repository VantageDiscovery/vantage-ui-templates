import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import useFilters from "hooks/useFilters";
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
import useQueries from "hooks/useQueries";

const DemoContext = createContext<DemoContextType>({} as DemoContextType);

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

  const isMoreLikeTheseActiv = (): boolean => {
    return vibeHandler.activeVibe.length > 0;
  };

  const {
    multiQuerySearchResults,
    multiMLTSearchResults,
    multiMLTheseSearchResults,
    multiMLTheseDocumentIdResults,
  } = useQueries({
    dataConfiguration,
    query,
    moreLikeDocumentId,
    isMoreLikeTheseActiv: isMoreLikeTheseActiv(),
    vibeHandler,
    filters: filterHandlers.getFilterString(),
    customerAPI,
  });

  const returnTypeOfResults = () => {
    if (isMoreLikeTheseActiv()) {
      return moreLikeDocumentId
        ? multiMLTheseDocumentIdResults
        : multiMLTheseSearchResults;
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
    multiMLTheseDocumentIdResults,
  ]);

  const refetchSearchQueryResults = () => {
    for (const searchResults of multiQuerySearchResults) {
      searchResults.refetch();
    }
  };

  const refetchMLTheseSearchResults = () => {
    for (const searchResults of multiMLTheseSearchResults) {
      searchResults.refetch();
    }
  };

  const refetchMLTheseDocumentIdResults = () => {
    for (const searchResults of multiMLTheseDocumentIdResults) {
      searchResults.refetch();
    }
  };

  useEffect(() => {
    performFilterChange();
  }, [filterHandlers.activeFilters]);

  const performMoreLikeThese = () => {
    moreLikeDocumentId
      ? refetchMLTheseDocumentIdResults()
      : refetchMLTheseSearchResults();
  };

  const performFilterChange = () => {
    if (isMoreLikeTheseActiv()) {
      performMoreLikeThese();
      return;
    }
    refetchSearchQueryResults();
  };
  const performSearch = () => {
    setSearchUrl(query);
    if (isMoreLikeTheseActiv()) {
      moreLikeDocumentId
        ? setMoreLikeDocumentId("")
        : refetchMLTheseSearchResults();
      return;
    }
    setMoreLikeDocumentId("");
    refetchSearchQueryResults();
  };

  const performMoreLikeThis = (id: string) => {
    if (isMoreLikeTheseActiv() && moreLikeDocumentId === id) {
      refetchMLTheseDocumentIdResults();
      return;
    }
    setDocumentId(id);
    setMoreLikeDocumentId(id);
  };

  useEffect(() => {
    if (isMoreLikeTheseActiv()) {
      performMoreLikeThese();
      return;
    }
    if (!moreLikeDocumentId) refetchSearchQueryResults();
  }, [vibeHandler.activeVibe]);

  return (
    <DemoContext.Provider
      value={{
        filterActions: filterHandlers,
        vibeActions: vibeHandler,
        searchResults: collectionSearchResults,
        demoActions: {
          performSearch,
          performMoreLikeThis,
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
