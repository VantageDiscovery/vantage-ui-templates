import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { UseFiltersType } from "abstracts/FilterTypes";
import { Item } from "abstracts/ItemTypes";
import useFilters from "hooks/useFilters";
import { VantageSearchQueries } from "queries/VantageSearchQueries";
import useCustomerAPI from "../hooks/useCustomerApi";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  useEffect,
} from "react";
import useUrlParams from "hooks/useUrlParams";

type CollectionSearchResult = {
  collectionId: string;
  items: Item[];
  executionTime: number;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type DemoVariables = {
  query: string;
  isDeveloperViewToggled: boolean;
  moreLikeDocumentId: string;
};

type DemoActions = {
  performSearch: () => void;
  performMoreLikeThis: (id: string) => void;
  setQuery: Dispatch<React.SetStateAction<string>>;
  setIsDeveloperViewToggled: Dispatch<React.SetStateAction<boolean>>;
};

type DemoContextType = {
  searchResults: CollectionSearchResult[];
  variables: DemoVariables;
  dataConfiguration: DataConfiguration;
  filterActions: UseFiltersType;
  demoActions: DemoActions;
};

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
  const filterHandlers = useFilters({
    filterType: configuration.filter.type,
    getAvailableFilters: configuration.filter.getFilters,
    getPopularFilters: configuration.filter.getPopularFilters,
  });
  const customerAPI = useCustomerAPI({
    dataConfiguration: configuration,
  });

  const configurationWithParameters = useUrlParams({
    dataConfiguration: configuration,
  });
  const [query, setQuery] = useState<string>(configuration.defaultSearchQuery);
  const [isDeveloperViewToggled, setIsDeveloperViewToggled] =
    useState<boolean>(false);
  const [moreLikeDocumentId, setMoreLikeDocumentId] = useState<string>("");

  const multiQuerySearchResults = VantageSearchQueries.useSearchByConfiguration(
    configurationWithParameters.collectionIds.map((collectionId: string) => ({
      apiKey: configurationWithParameters.apiKey,
      customerId: configurationWithParameters.accountId,
      customerNamespace: collectionId,
      shingling: configurationWithParameters.shingling,
    })),
    {
      query,
      accuracy: configurationWithParameters.defaultAccuracy,
      filters: filterHandlers.getFilterString(),
      pageNumber: configurationWithParameters.pageNumber || DEFAULT_PAGE_NUMBER,
      pageSize: configurationWithParameters.pageSize || DEFAULT_PAGE_SIZE,
    },
    {
      getItemsByIds: customerAPI.getItemsByIds,
    }
  );

  const multiMLTSearchResults =
    VantageSearchQueries.useMoreLikeThisByConfiguration(
      configurationWithParameters.collectionIds.map((collectionId: string) => ({
        apiKey: configurationWithParameters.apiKey,
        customerId: configurationWithParameters.accountId,
        customerNamespace: collectionId,
        shingling: configurationWithParameters.shingling,
      })),
      {
        documentId: moreLikeDocumentId,
        accuracy: configurationWithParameters.defaultAccuracy,
        pageNumber:
          configurationWithParameters.pageNumber || DEFAULT_PAGE_NUMBER,
        pageSize: configurationWithParameters.pageSize || DEFAULT_PAGE_SIZE,
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

  useEffect(() => {
    setMoreLikeDocumentId("");
    refetchSearchQueryResults();
  }, [filterHandlers.activeFilters]);

  return (
    <DemoContext.Provider
      value={{
        filterActions: filterHandlers,
        searchResults: collectionSearchResults,
        demoActions: {
          performSearch: () => {
            setMoreLikeDocumentId("");
            refetchSearchQueryResults();
          },
          performMoreLikeThis: (id: string) => {
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
