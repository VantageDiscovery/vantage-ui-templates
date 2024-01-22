import useCustomerAPI from "./hooks/useCustomerApi";
import { Application, VantageWrapper as Wrapper } from "./App";
import ProductCard from "./component/ProductCard";
import {
  ClientConfiguration,
  DataConfiguration,
} from "./abstracts/DemoConfigurationTypes";
import { GetConfigurationWithDefaultValues } from "./transformers/ConfigurationTransformer";
import useDemo from "contexts/DemoContext";
import PublishCard from "./component/PublishCard";
import useFilters from "./hooks/useFilters";
import {
  DemoContextType,
  EFiltersType,
  Filter,
  NavigationProperties,
  ProductSearchProperies,
  ServiceResponseWrapperProperties,
  UseCustomerAPIType,
  UseFiltersType,
  UseUrlParametersType,
} from "./abstracts";
import useUrlParameters from "./hooks/useUrlParameters";
import useToggle from "./hooks/useToggle";
import SingleFilterSection from "./component/filter/SingleFilterSection";
import MultiFilterSection from "./component/filter/MultiFilterSection";
import Navigation from "./component/layout/Navigation";
import ServerResponseWrapper from "./component/ServerResponseWrapper";
import Footer from "./component/layout/Footer";
import ProductSearchSection from "./component/search/ProductSearchSection";
import {
  ProductCardProperties,
  PublishCardProperties,
} from "./abstracts/CardTypes";

/**
 * Generate a demo based on a given client configuration.
 * @param {ClientConfiguration} configuration - The client configuration.
 * @returns {React.JSX.Element} - The generated demo.
 */

export const generateTempleteWithConfig = (
  configuration: ClientConfiguration
): React.JSX.Element => {
  return Application(GetConfigurationWithDefaultValues(configuration));
};

/**
 * A React component that wraps children with a modified configuration.
 * Mandatory when using our useDemoHook or VantageSearchQueries
 * @param {Object} props - The component props.
 * @param {ClientConfiguration} props.configuration - The client configuration.
 * @param {React.JSX.Element} props.children - The child elements to be wrapped.
 * @returns {React.JSX.Element} - The wrapped JSX element.
 */

export const VantageWrapper = ({
  configuration,
  children,
}: {
  configuration: ClientConfiguration;
  children: React.JSX.Element;
}): React.JSX.Element => {
  return Wrapper({
    configuration: GetConfigurationWithDefaultValues(configuration),
    children: children,
  });
};

/**
 * Custom hook for using the Customer API for modifying specified data configuration to use our customer api.
 * @param {Object} props - The hook props.
 * @param {DataConfiguration} props.dataConfiguration - The data configuration.
 * @returns {UseCustomerAPIType} - The result of the useCustomerAPI hook getItemsByIds: (id: string[]) => Promise<ItemWithoutScore[]>;
  getFilters: () => Promise<Filter[]>;.
 */

export const useCustomerAPIHook = ({
  dataConfiguration,
}: {
  dataConfiguration: DataConfiguration;
}): UseCustomerAPIType => {
  return useCustomerAPI({ dataConfiguration: dataConfiguration });
};

/**
 * Custom hook for using context provider.
 * @returns {DemoContextType} - The result of the useDemo hook:
 * searchResults:CollectionSearchResult[];
 * variables: DemoVariables;
 * dataConfiguration: DataConfiguration;
 * filterActions: UseFiltersType;
 * demoActions: DemoActions;.
 */

export const useDemoHook = (): DemoContextType => {
  return useDemo();
};

/**
 * Custom hook for managing the URL states with specified configurations.
 * @param {Object} props - The hook props.
 * @param {DataConfiguration} props.dataConfiguration - The data configuration.
 * @param {string} [props.search] - Optional search parameter.
 * @param {string} [props.documentId] - Optional document ID parameter.
 * @returns {UseUrlParamsType} - The result of the useUrlParams hook.
 */

// eslint-disable-next-line unicorn/prevent-abbreviations
export const useUrlParamsHook = ({
  dataConfiguration,
  search,
  documentId,
}: {
  dataConfiguration: DataConfiguration;
  search?: string;
  documentId?: string;
}): UseUrlParametersType => {
  return useUrlParameters({
    dataConfiguration,
    search,
    documentId,
  });
};

/**
 * Custom hook for managing filters.
 * @param {Object} props - The hook props.
 * @param {EFiltersType} props.filterType - The type of filters.
 * @param {Function} props.getAvailableFilters - A function to fetch available filters.
 * @param {Function} [props.getPopularFilters] - An optional function to filter popular filters.
 * @returns {UseFiltersType} - The result of the useFilters hook.
 */

export const useFilterHook = ({
  filterType,
  getAvailableFilters,
  getPopularFilters,
}: {
  filterType: EFiltersType;
  getAvailableFilters: () => Promise<Filter[]>;
  getPopularFilters?: (filters: Filter[]) => Filter[];
}): UseFiltersType => {
  return useFilters({ filterType, getAvailableFilters, getPopularFilters });
};

/**
 * Custom hook for managing a boolean toggle state.
 * @returns {[boolean, () => void]} - A tuple containing the boolean state and a function to toggle it.
 */

export const useToggleHook = (): [boolean, () => void] => {
  return useToggle();
};

/**
 * Vantage-specific product card component.
 * @param {ProductCardProperties} ProductCardProperies - The properties for the product card.
 * @returns {React.JSX.Element} - The rendered product card JSX element.
 */

export const VantageProductCard = (
  ProductCardProperies: ProductCardProperties
): React.JSX.Element => {
  return ProductCard(ProductCardProperies);
};

/**
 * Vantage-specific product search section component.
 * @param {ProductSearchProperies} props - The properties for the product search section.
 * @returns {React.JSX.Element} - The rendered product search section JSX element.
 */

export const VantageProductSearchSection = ({
  searchQuery,
  onSearchPerformed,
  setSearchQuery,
  useFiltersHook,
  isSingleFilter,
  searchPlaceholder = "Search for anything...",
}: ProductSearchProperies): React.JSX.Element => {
  return ProductSearchSection({
    searchQuery,
    onSearchPerformed,
    setSearchQuery,
    useFiltersHook,
    isSingleFilter,
    searchPlaceholder,
  });
};

/**
 * Vantage-specific publish card component.
 *
 * @param {Object} props - The component props.
 * @param {PublishCardProperties} props.cardProperties - Properties for rendering the publish card.
 * @param {boolean} props.isDeveloperView - Indicates whether the card is in developer view.
 * @param {Function} props.onMoreLikeThis - Callback function triggered on "More Like This" action.
 * @param {string} props.primaryColor - The primary color for styling the publish card.
 * @param {string} props.secondaryColor - The secondary color for styling the publish card.
 *
 * @returns {React.JSX.Element} - The rendered Vantage publish card JSX element.
 */

export const VantagePublishCard = ({
  cardProperties,
  isDeveloperView,
  onMoreLikeThis,
  primaryColor,
  secondaryColor,
}: PublishCardProperties): React.JSX.Element => {
  return PublishCard({
    cardProperties,
    isDeveloperView,
    onMoreLikeThis,
    primaryColor,
    secondaryColor,
  });
};

/**
 * Vantage Navigation:
 * A specialized wrapper for navigation bar.
 * Accepts specific properties to customize the navigation appearance, including colors and animations.
 *
 * @param {Object} props - The component props.
 * @param {string} props.backgroundColor - The background color of the navigation.
 * @param {string} props.vantageLogoColor - The color of the Vantage logo.
 * @param {string} props.vantageLogoColorOnAnimation - The color of the Vantage logo during animation.
 * @param {string} props.backgroundLeftColorOnAnimation - The left background color during animation.
 * @param {string} props.backgroundRightColorOnAnimation - The right background color during animation.
 * @param {string} props.clientLogoColor - The color of the client logo on animation finish.
 * @param {string} props.clientLogoColorOnAnimation - The color of the client logo during animation.
 * @param {string} props.clientLogoUrl - The URL of the client logo.
 * @returns {React.JSX.Element} - The redered navigation JSX element.
 */

export const VantageNavigation = ({
  backgroundColor,
  vantageLogoColor,
  vantageLogoColorOnAnimation,
  backgroundLeftColorOnAnimation,
  backgroundRightColorOnAnimation,
  clientLogoColor, // color to be on animation finish
  clientLogoColorOnAnimation, // color to be on animation
  clientLogoUrl,
}: NavigationProperties): React.JSX.Element => {
  return Navigation({
    backgroundColor,
    vantageLogoColor,
    vantageLogoColorOnAnimation,
    backgroundLeftColorOnAnimation,
    backgroundRightColorOnAnimation,
    clientLogoColor,
    clientLogoColorOnAnimation,
    clientLogoUrl,
  });
};

/**
 * Vantage Footer:
 * Footer with vantage logo
 * @returns {React.JSX.Element} - The rendered service response wrapper JSX element.
 */

export const VantageFooter = (): React.JSX.Element => {
  return Footer();
};

/**
 * Vantage Service Response Wrapper:
 * Manages different states of service responses, such as loading, error, success, and no results.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoading - Indicates whether data is currently being loaded.
 * @param {boolean} props.isError - Indicates whether an error occurred during data retrieval.
 * @param {boolean} props.isSuccess - Indicates whether the data retrieval was successful.
 * @param {boolean} props.isNoResults - Indicates if there are no results to display.
 * @param {React.ReactNode} props.children - The content to be rendered within the wrapper.
 * @param {string} [props.loadingMessage="Loading"] - The message to display during loading.
 * @param {string} [props.loadingSpinnerColor="black"] - The color of the loading spinner.
 *
 * @returns {React.JSX.Element} - The rendered service response wrapper JSX element.
 */

export const VantageServiceResponseWrapper = ({
  isLoading,
  isError,
  isSuccess,
  isNoResults,
  children,
  loadingMessage = "Loading",
  loadingSpinnerColor = "black",
}: ServiceResponseWrapperProperties): React.JSX.Element => {
  return ServerResponseWrapper({
    isLoading,
    isError,
    isSuccess,
    isNoResults,
    children,
    loadingMessage,
    loadingSpinnerColor,
  });
};

/**
 * Vantage Single-Filter Section:
 * A specialized component  serving as a section for filters
 *
 * @param {Object} props - The component props.
 * @param {UseFiltersType} props.useFilters - The useFilters hook for managing filters.
 * @returns {React.JSX.Element} - The rendered multi-filter section JSX element.
 */

export const VantageSingleFilterSection = ({
  useFilters,
}: {
  useFilters: UseFiltersType;
}): React.JSX.Element => {
  return SingleFilterSection({ useFilters });
};

/**
 * Vantage Multi-Filter Section:
 * A specialized component  serving as a section for filters
 *
 * @param {Object} props - The component props.
 * @param {UseFiltersType} props.useFilters - The useFilters hook for managing filters.
 * @returns {React.JSX.Element} - The rendered multi-filter section JSX element.
 */

export const VantageMultiFilterSection = ({
  useFilters,
}: {
  useFilters: UseFiltersType;
}): React.JSX.Element => {
  return MultiFilterSection({ useFilters });
};

export { VantageSearchQueries } from "./queries/VantageSearchQueries";

export * from "./abstracts";
