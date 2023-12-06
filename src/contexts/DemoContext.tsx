import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { UseFiltersType } from "abstracts/FilterTypes";
import { Item } from "abstracts/ItemTypes";
import useFilters from "hooks/useFilters";
import { VantageSearchQueries } from "queries/VantageSearchQueries";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  useEffect,
} from "react";

type ItemState = {
  items: Item[];
  executionTime: number;
  dataConfiguration: DataConfiguration;
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
  filterActions: UseFiltersType;
  demoActions: DemoActions;
  itemState: ItemState;
  variables: DemoVariables;
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
  const [query, setQuery] = useState<string>(configuration.defaultSearchQuery);
  const [isDeveloperViewToggled, setIsDeveloperViewToggled] =
    useState<boolean>(false);
  const [moreLikeDocumentId, setMoreLikeDocumentId] = useState<string>("");

  const {
    data: searchResults,
    isFetching: areItemsLoading,
    isError: areItemsError,
    isSuccess: areItemsSuccess,
    refetch: refetchItems,
  } = VantageSearchQueries.useSearchByConfiguration(
    {
      apiKey: configuration.apiKey,
      customerId: configuration.accountId,
      customerNamespace: configuration.collectionId,
    },
    {
      query,
      accuracy: configuration.defaultAccuracy,
      filters: filterHandlers.getFilterString(),
      pageNumber: configuration.pageNumber || DEFAULT_PAGE_NUMBER,
      pageSize: configuration.pageSize || DEFAULT_PAGE_SIZE,
    },
    {
      getItemsByIds: configuration.getCustomerItems,
    }
  );

  const {
    data: moreLikeThisItems,
    isFetching: isMoreLikeThisLoading,
    isError: isMoreLikeThisError,
    isSuccess: isMoreLikeThisSuccess,
    refetch: refetchMoreLikeThis,
  } = VantageSearchQueries.useMoreLikeThisByConfiguration(
    {
      apiKey: configuration.apiKey,
      customerId: configuration.accountId,
      customerNamespace: configuration.collectionId,
    },
    {
      documentId: moreLikeDocumentId,
      accuracy: configuration.defaultAccuracy,
      filters: "",
      pageNumber: configuration.pageNumber || DEFAULT_PAGE_NUMBER,
      pageSize: configuration.pageSize || DEFAULT_PAGE_SIZE,
    },
    {
      getItemsByIds: configuration.getCustomerItems,
    }
  );

  const [executionTime, items]: [number, Item[]] = useMemo(
    () => (moreLikeDocumentId ? moreLikeThisItems : searchResults) ?? [0, []],
    [searchResults, moreLikeThisItems]
  );

  useEffect(() => {
    setMoreLikeDocumentId("");
    refetchItems();
  }, [filterHandlers.activeFilters]);

  useEffect(() => {
    if (moreLikeDocumentId) {
      refetchMoreLikeThis();
    }
  }, [moreLikeDocumentId]);

  return (
    <DemoContext.Provider
      value={{
        filterActions: filterHandlers,
        itemState: {
          executionTime: executionTime,
          dataConfiguration: configuration,
          isError: areItemsError || isMoreLikeThisError,
          isLoading: areItemsLoading || isMoreLikeThisLoading,
          isSuccess: areItemsSuccess || isMoreLikeThisSuccess,
          items: items,
        },
        demoActions: {
          performSearch: () => {
            setMoreLikeDocumentId("");
            refetchItems();
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
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export default function useDemo() {
  return useContext(DemoContext);
}
