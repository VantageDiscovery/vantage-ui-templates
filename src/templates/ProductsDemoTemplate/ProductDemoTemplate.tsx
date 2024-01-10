import { BrandingConfiguration } from "abstracts/DemoConfigurationTypes";
import ProductCard from "component/ProductCard";
import ServerResponseWrapper from "component/ServerResponseWrapper";
import ToggleButton from "component/ToggleButton";
import MultiFilterSection from "component/filter/MultiFilterSection";
import SingleFilterSection from "component/filter/SingleFilterSection";
import Footer from "component/layout/Footer";
import Navigation from "component/layout/Navigation";
import ProductSearchSection from "component/search/ProductSearchSection";
import useDemo from "contexts/DemoContext";
import React, { useEffect, useMemo } from "react";
import { EFiltersType } from "abstracts/FilterTypes";
import { Link } from "react-router-dom";
import { LinkIcon } from "@heroicons/react/24/outline";

const ProductDemoTemplate = ({
  brandingConfiguration,
}: {
  brandingConfiguration: BrandingConfiguration;
}): JSX.Element => {
  const {
    filterActions,
    searchResults,
    variables,
    demoActions,
    dataConfiguration,
  } = useDemo();

  useEffect(() => {
    if (brandingConfiguration.pageTitle) {
      document.title = brandingConfiguration.pageTitle;
    }
  }, []);

  const searchResult = useMemo(() => searchResults[0], [searchResults]);

  const renderFilterSection = () => {
    if (!dataConfiguration.filter) {
      return <></>;
    }

    if (dataConfiguration.filter.type === EFiltersType.SINGLE_SELECT) {
      return <SingleFilterSection useFilters={filterActions} />;
    }

    if (dataConfiguration.filter.type === EFiltersType.MULTI_SELECT) {
      return <MultiFilterSection useFilters={filterActions} />;
    }
  };

  return (
    <div className="flex flex-col w-full overflow-visible gap-0 justify-between min-h-screen">
      <Navigation
        clientLogoUrl={brandingConfiguration.logoUrl}
        backgroundColor="white"
        vantageLogoColor="black"
        vantageLogoColorOnAnimation="black"
        clientLogoColor="black"
        clientLogoColorOnAnimation="white"
        backgroundLeftColorOnAnimation="#333333"
        backgroundRightColorOnAnimation={brandingConfiguration.colors.primary}
      />
      <div className="grow w-full h-full">
        <div className="flex justify-center animate-fade-in">
          <div className="flex flex-col items-center w-full gap-8">
            <div className="flex flex-col w-3/5 gap-10">
              <h3 className="font-bold text-4xl text-center">
                {brandingConfiguration.title}
              </h3>
            </div>
            <div className="flex flex-col w-3/5 gap-10">
              <ProductSearchSection
                searchQuery={variables.query}
                setSearchQuery={demoActions.setQuery}
                onSearchPerformed={demoActions.performSearch}
                searchPlaceholder={brandingConfiguration.searchPlaceholder}
                useFiltersHook={filterActions}
                isSingleFilter={
                  dataConfiguration.filter.type === EFiltersType.SINGLE_SELECT
                }
              />
            </div>
            <hr className="w-full" />
            <div className="w-full">{renderFilterSection()}</div>
            <hr className="w-full" />
            <div className="flex justify-between w-full">
              {dataConfiguration.originalSearchResultsURL && (
                <span className="flex px-24 w-full justify-start gap-2 items-center text-lg">
                  <p className="font-medium">You searched: </p>
                  <p>{variables.query}</p>a
                  <p className="mt-0.5">
                    <Link
                      to={dataConfiguration.originalSearchResultsURL.replace(
                        "${query}",
                        variables.query
                      )}
                      target="_new"
                    >
                      <LinkIcon className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </p>
                </span>
              )}
              {!!searchResult.executionTime && (
                <span className="flex justify-end text-xl mr-24 w-full">
                  You have <b className="px-1">{searchResult.items.length}</b>
                  search results
                  {searchResult.executionTime && (
                    <>
                      &nbsp;in
                      <b className="px-1">
                        {(+searchResult.executionTime / 1000).toFixed(2)}
                        seconds
                      </b>
                    </>
                  )}
                </span>
              )}
            </div>
            <div className="px-24 w-full flex flex-row space-x-5 items-center">
              <ToggleButton
                text="Developer debug"
                checkedColor={brandingConfiguration.colors.primary}
                isEnabled={variables.isDeveloperViewToggled}
                setIsEnabled={demoActions.setIsDeveloperViewToggled}
              />
              {variables.isDeveloperViewToggled &&
                filterActions.activeFilters.length > 0 && (
                  <div className="text-xl leading-none">
                    {filterActions.getFilterString()}
                  </div>
                )}
            </div>
            <ServerResponseWrapper
              isLoading={searchResult.isLoading}
              isError={searchResult.isError}
              isSuccess={searchResult.isSuccess}
              isNoResults={
                !searchResult.isLoading && searchResult.items.length === 0
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-12 justify-center">
                {searchResult.items.map((item, index) => (
                  <ProductCard
                    key={index}
                    {...item}
                    subtitle={item.meta?.subtitle}
                    infoContent={item.embeddingText}
                    searchAccuracy={item.score}
                    bottomRightLabel={item.meta?.imageLabel}
                    redirectUrl={item.externalUrl}
                    primaryColor={brandingConfiguration.colors.primary}
                    secondaryColor={brandingConfiguration.colors.secondary}
                    onMoreLikeThisClicked={() => {
                      demoActions.setQuery(
                        `${item.title} - ${item.description}`
                      );
                      demoActions.performMoreLikeThis(item.id);
                    }}
                    isDeveloperView={variables.isDeveloperViewToggled}
                  />
                ))}
              </div>
            </ServerResponseWrapper>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDemoTemplate;
