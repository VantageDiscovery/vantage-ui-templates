import { Dispatch } from "react";
import { Item } from "./ItemTypes";
import { DataConfiguration } from "./DemoConfigurationTypes";
import { UseFiltersType } from "./FilterTypes";
import { UseVibeType } from "./VibeTypes";
import { useMoreLikeTheseType } from "./useMoreLikeTheseType";
import { TypeAheadType } from "./typeAheadType";

export type CollectionSearchResult = {
  collectionId: string;
  items: Item[];
  executionTime: number;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export type DemoVariables = {
  query: string;
  isDeveloperViewToggled: boolean;
  moreLikeDocumentId: string;
  enableMoreLikeThese: boolean;
};

export type DemoActions = {
  performSearch: () => void;
  performMoreLikeThis: (id: string) => void;
  setQuery: Dispatch<React.SetStateAction<string>>;
  setIsDeveloperViewToggled: Dispatch<React.SetStateAction<boolean>>;
};

export type DemoContextType = {
  vibeActions: UseVibeType;
  searchResults: CollectionSearchResult[];
  variables: DemoVariables;
  dataConfiguration: DataConfiguration;
  filterActions: UseFiltersType;
  demoActions: DemoActions;
  moreLikeTheseActions: useMoreLikeTheseType;
  typeAheadHandler: TypeAheadType | undefined;
};
