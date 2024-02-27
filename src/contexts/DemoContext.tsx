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
import useSearchs from "hooks/useSearchs";
import useMoreLikeThese from "hooks/useMoreLikeThese";

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

  const {
    dataConfiguration,
    search,
    documentId,
    setSearchUrl,
    setDocumentId,
    filters,
    setFiltersUrl,
  } = useUrlParams({
    dataConfiguration: configuration,
  });

  const filterHandlers = useFilters({
    filterType: configuration.filter.type,
    getAvailableFilters: customerAPI.getFilters,
    getPopularFilters: configuration.filter.getPopularFilters,
    initialActiveFilters: filters,
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
    vibeOverallWeightDefault: dataConfiguration.vibe?.vibeOverallWeight,
  });

  const isVibeActive = (): boolean => {
    return vibeHandler.activeVibe.length > 0 && !moreLikeTheseHandler.isActive;
  };

  const moreLikeTheseHandler = useMoreLikeThese();

  const {
    multiQuerySearchResults,
    multiMLTSearchResults,
    multiVibeSearchResults,
    multiVibeDocumentIdResults,
    multiMoreLikeTheseResults,
  } = useSearchs({
    dataConfiguration,
    query,
    moreLikeDocumentId,
    isMoreLikeTheseActive: isVibeActive(),
    vibeHandler,
    filters: filterHandlers.getFilterString(),
    customerAPI,
    moreLikeTheseHandler,
  });

  const returnTypeOfResults = () => {
    if (moreLikeTheseHandler.isActive) {
      return multiMoreLikeTheseResults;
    }
    if (isVibeActive()) {
      return moreLikeDocumentId
        ? multiVibeDocumentIdResults
        : multiVibeSearchResults;
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
    multiVibeSearchResults,
    multiVibeDocumentIdResults,
    multiMoreLikeTheseResults,
  ]);

  const refetchSearchQueryResults = () => {
    for (const searchResults of multiQuerySearchResults) {
      searchResults.refetch();
    }
  };

  const refetchVibeSearchResults = () => {
    for (const searchResults of multiVibeSearchResults) {
      searchResults.refetch();
    }
  };

  const refetchVibeDocumentIdResults = () => {
    for (const searchResults of multiVibeDocumentIdResults) {
      searchResults.refetch();
    }
  };

  const refetchMLTResults = () => {
    for (const searchResults of multiMoreLikeTheseResults) {
      searchResults.refetch();
    }
  };

  useEffect(() => {
    moreLikeTheseHandler.isActive && refetchMLTResults();
  }, [moreLikeTheseHandler.activeMLThese]);

  useEffect(() => {
    performFilterChange();
    setFiltersUrl(
      filterHandlers.activeFilters.length > 0
        ? filterHandlers.getFilterString()
        : undefined
    );
  }, [filterHandlers.activeFilters]);

  const performMoreLikeThese = () => {
    moreLikeDocumentId
      ? refetchVibeDocumentIdResults()
      : refetchVibeSearchResults();
  };

  const performFilterChange = () => {
    if (moreLikeTheseHandler.isActive) {
      refetchMLTResults();
      return;
    }
    if (isVibeActive()) {
      performMoreLikeThese();
      return;
    }
    refetchSearchQueryResults();
  };
  const performSearch = () => {
    setSearchUrl(query);
    if (isVibeActive()) {
      moreLikeDocumentId
        ? setMoreLikeDocumentId("")
        : refetchVibeSearchResults();
      return;
    }
    setMoreLikeDocumentId("");
    refetchSearchQueryResults();
  };

  const performMoreLikeThis = (id: string) => {
    if (isVibeActive() && moreLikeDocumentId === id) {
      refetchVibeDocumentIdResults();
      return;
    }
    setDocumentId(id);
    setMoreLikeDocumentId(id);
  };

  useEffect(() => {
    if (isVibeActive()) {
      performMoreLikeThese();
      return;
    }
    if (!moreLikeDocumentId) refetchSearchQueryResults();
  }, [vibeHandler.activeVibe]);

  return (
    <DemoContext.Provider
      value={{
        moreLikeTheseActions: moreLikeTheseHandler,
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
          enableMoreLikeThis: dataConfiguration.enableMoreLikeThis,
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
