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
import useTypeAhead from "hooks/useTypeAhead";
import { UseMutationResult } from "@tanstack/react-query";
import { Item } from "abstracts";
import useActiveResult from "hooks/useActiveResult";
import { Action } from "abstracts/ActiveResultTypes";
import usePeronalization from "hooks/usePersonalization";

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

  const personalizationHandler = usePeronalization();

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
  const { activeResult, setResult, lastResult } =
    useActiveResult(moreLikeDocumentId);
  const [isDeveloperViewToggled, setIsDeveloperViewToggled] =
    useState<boolean>(false);

  const vibeHandler = useVibe({
    getBoards: dataConfiguration?.vibe?.getBoards,
  });

  const isVibeActive = (): boolean => {
    return vibeHandler.activeVibe.length > 0 && !moreLikeTheseHandler.isActive;
  };

  const typeAheadHandler = useTypeAhead({
    query,
    typeAhead: dataConfiguration.typeAhead,
  });
  const moreLikeTheseHandler = useMoreLikeThese();

  const {
    querySearchResult,
    moreLikeThisResult,
    moreLikeTheseResult,
    vibeDocumentIdResult,
    vibeSearchResult,
    personalizationMoreLikeTheseResults,
  } = useSearchs({
    dataConfiguration,
    query,
    moreLikeDocumentId,
    vibeHandler: { ...vibeHandler, id: dataConfiguration.vibe?.vibeId },
    filters: filterHandlers.getFilterString(),
    customerAPI,
    moreLikeTheseHandler,
    setActiveResult: setResult,
    personalization_items: personalizationHandler.personalizationItems,
    personalization_overall_weight:
      personalizationHandler.personalizationWeight,
  });

  const ActiveSearchResult: Record<
    Action,
    UseMutationResult<[number, Item[]], Error>
  > = {
    [Action.SEMANTIC]: querySearchResult,
    [Action.MORE_LIKE_THIS]: moreLikeThisResult,
    [Action.MORE_LIKE_THESE]: moreLikeTheseResult,
    [Action.VIBE_TEXT]: vibeSearchResult,
    [Action.VIBE_DOCUMENT_ID]: vibeDocumentIdResult,
    [Action.PERSONALIZATION]: personalizationMoreLikeTheseResults,
  };

  const collectionSearchResults: CollectionSearchResult[] = useMemo(() => {
    const { data, isError, isPending, isSuccess } =
      ActiveSearchResult[activeResult];
    return [
      {
        items: data?.[1] ?? [],
        executionTime: data?.[0] ?? 0,
        isError,
        isLoading: isPending,
        isSuccess,
        collectionId: configuration.collectionIds[0], // as per Tanstack useQueries configuration
      },
    ];
  }, [
    moreLikeThisResult,
    querySearchResult,
    moreLikeTheseResult,
    vibeDocumentIdResult,
    vibeSearchResult,
  ]);

  useEffect(() => {
    if (!moreLikeTheseHandler.isMoreLikeTheseDirty) return;
    const isThereActiveMLT = moreLikeTheseHandler.activeMLThese.length === 0;
    performMoreLikeThese(isThereActiveMLT);
  }, [moreLikeTheseHandler.activeMLThese]);

  useEffect(() => {
    if (vibeHandler.isVibeDirty && isVibeActive()) {
      performVibeQuery();
      return;
    }
    if (vibeHandler.isVibeDirty) performSearch();
  }, [vibeHandler.activeVibe]);

  useEffect(() => {
    if (!filterHandlers.isFilterDirty) return;
    performActiveResultRefetch();
    setFiltersUrl(
      filterHandlers.activeFilters.length > 0
        ? filterHandlers.getFilterString()
        : undefined
    );
  }, [filterHandlers.activeFilters, filterHandlers.isFilterDirty]);

  const performActiveResultRefetch = () => {
    ActiveSearchResult[activeResult].mutate({});
  };

  const performLastResultRefetch = () => {
    ActiveSearchResult[lastResult].mutate({});
  };

  const performVibeQuery = () => {
    activeResult === Action.MORE_LIKE_THIS ||
    activeResult === Action.VIBE_DOCUMENT_ID
      ? vibeDocumentIdResult.mutate({})
      : vibeSearchResult.mutate({});
  };

  const performSearch = () => {
    setSearchUrl(query);
    if (isVibeActive()) {
      vibeSearchResult.mutate({});
      return;
    }
    personalizationHandler.isPersonalizationActive
      ? personalizationMoreLikeTheseResults.mutate({})
      : querySearchResult.mutate({});
  };

  const performMoreLikeThis = (id: string) => {
    setDocumentId(id);
    setMoreLikeDocumentId(id);
    if (isVibeActive()) {
      vibeDocumentIdResult.mutate({});
      return;
    }
    personalizationHandler.isPersonalizationActive
      ? personalizationMoreLikeTheseResults.mutate({})
      : moreLikeThisResult.mutate({});
  };

  const performMoreLikeThese = (toggle?: boolean) => {
    if (toggle === true || toggle === undefined) {
      moreLikeTheseHandler.toggleActivate();
      !moreLikeTheseHandler.isActive
        ? moreLikeTheseResult.mutate({})
        : performLastResultRefetch();
      return;
    }
    moreLikeTheseHandler.isActive && moreLikeTheseResult.mutate({});
  };

  return (
    <DemoContext.Provider
      value={{
        moreLikeTheseActions: moreLikeTheseHandler,
        filterActions: filterHandlers,
        vibeActions: vibeHandler,
        personalizationActions: personalizationHandler,
        searchResults: collectionSearchResults,
        demoActions: {
          performSearch,
          performMoreLikeThis,
          setQuery,
          setIsDeveloperViewToggled,
          performMoreLikeThese,
        },
        variables: {
          query,
          isDeveloperViewToggled,
          moreLikeDocumentId,
          enableMoreLikeThese: dataConfiguration.enableMoreLikeThese,
        },
        dataConfiguration: configuration,
        typeAheadHandler,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export default function useDemo() {
  return useContext(DemoContext);
}
