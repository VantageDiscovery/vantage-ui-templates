import { UseFiltersType } from "./FilterTypes";
import { UseVibeType } from "./VibeTypes";
import { useMoreLikeTheseType } from "./useMoreLikeTheseType";

export type NavigationProperties = {
  backgroundColor: string; // theme color
  backgroundLeftColorOnAnimation: string;
  backgroundRightColorOnAnimation: string;
  vantageLogoColor: string; // color to be on animation finish
  clientLogoUrl: string;
  vantageLogoColorOnAnimation?: string; // color to be on animation
  clientLogoColor?: string; // color to be on animation finish
  clientLogoColorOnAnimation?: string; // color to be on animation
};

export type ModalProperties = {
  isVisible: boolean;
  children: JSX.Element;
  className?: string;
  onCloseModal?: () => void;
};

export type ServiceResponseWrapperProperties = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isNoResults: boolean;
  children: JSX.Element;
  loadingMessage?: string;
  loadingSpinnerColor?: string;
};

export type ProductSearchProperies = {
  searchQuery: string;
  onSearchPerformed: () => void;
  setSearchQuery: (value: string) => void;
  useFiltersHook: UseFiltersType;
  isSingleFilter: boolean;
  searchPlaceholder?: string;
  vibeActions?: UseVibeType;
  moreLikeTheseActions?: useMoreLikeTheseType;
};
