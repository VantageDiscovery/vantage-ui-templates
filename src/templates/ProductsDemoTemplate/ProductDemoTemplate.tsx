import { BrandingConfiguration } from "abstracts/DemoConfigurationTypes";
import ProductCard from "component/ProductCard";
import ServerResponseWrapper from "component/ServerResponseWrapper";
import MultiFilterSection from "component/filter/MultiFilterSection";
import SingleFilterSection from "component/filter/SingleFilterSection";
import Footer from "component/layout/Footer";
import Navigation from "component/layout/Navigation";
import ProductSearchSection from "component/search/ProductSearchSection";
import useDemo from "contexts/DemoContext";
import React, { useEffect, useMemo } from "react";
import { EFiltersType } from "abstracts/FilterTypes";
import sessionStorageService from "services/SessionStorageService";
import cn from "utils/cn";
import SelectedMoreLikeTheseSection from "component/SelectedMoreLikeTheseSection";
import { ProductResultsHeader } from "component/ProductResultsHeader";

const ANIMATION_DURATION = 3000;

const ProductDemoTemplate = ({
  brandingConfiguration,
}: {
  brandingConfiguration: BrandingConfiguration;
}): JSX.Element => {
  const {
    filterActions,
    vibeActions,
    searchResults,
    variables,
    demoActions,
    dataConfiguration,
    moreLikeTheseActions,
    typeAheadHandler,
  } = useDemo();

  useEffect(() => {
    if (brandingConfiguration.pageTitle) {
      document.title = brandingConfiguration.pageTitle;
    }

    const timer = setTimeout(
      () => sessionStorageService.setSessionAnimation("true"),
      ANIMATION_DURATION
    );
    return () => clearTimeout(timer);
  }, []);

  const searchResult = useMemo(() => searchResults[0], [searchResults]);

  const renderFilterSection = () => {
    if (!dataConfiguration.filter) {
      return;
    }

    if (dataConfiguration.filter.type === EFiltersType.SINGLE_SELECT) {
      return (
        <div className="w-full">
          <SingleFilterSection useFilters={filterActions} />;
        </div>
      );
    }

    if (dataConfiguration.filter.type === EFiltersType.MULTI_SELECT) {
      return (
        <div className="w-full">
          <MultiFilterSection
            useFilters={filterActions}
            selectedColor={brandingConfiguration.colors.primary}
          />
        </div>
      );
    }
  };

  const renderResultsHeader = () => {
    return moreLikeTheseActions.isActive ? (
      <SelectedMoreLikeTheseSection
        moreLikeTheseActions={moreLikeTheseActions}
        isDeveloperViewToggled={variables.isDeveloperViewToggled}
        setIsDeveloperViewToggled={demoActions.setIsDeveloperViewToggled}
        filterActions={filterActions}
        primaryColor={brandingConfiguration.colors.primary}
        secondaryColor={brandingConfiguration.colors.secondary}
        dataConfiguration={dataConfiguration}
      />
    ) : (
      <ProductResultsHeader
        variables={variables}
        setIsDeveloperViewToggled={demoActions.setIsDeveloperViewToggled}
        filterActions={filterActions}
        primaryColor={brandingConfiguration.colors.primary}
        dataConfiguration={dataConfiguration}
        searchResult={searchResult}
      />
    );
  };

  return (
    <div className="flex flex-col w-full overflow-visible justify-between min-h-screen">
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
        <div
          className={cn("flex justify-center", {
            "animate-fade-in": !sessionStorageService.getSessionAnimation(),
          })}
          style={
            {
              "--animation-duration": ANIMATION_DURATION + "ms",
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col items-center w-full gap-8">
            <div className="flex flex-col w-3/5 gap-10">
              <h3 className="font-bold text-4xl text-center">
                {brandingConfiguration.title}
              </h3>
            </div>
            {!moreLikeTheseActions.isActive && (
              <div className="flex flex-col w-5/6 gap-10 items-center">
                <ProductSearchSection
                  searchQuery={variables.query}
                  setSearchQuery={demoActions.setQuery}
                  onSearchPerformed={demoActions.performSearch}
                  searchPlaceholder={brandingConfiguration.searchPlaceholder}
                  useFiltersHook={filterActions}
                  isSingleFilter={
                    dataConfiguration.filter.type === EFiltersType.SINGLE_SELECT
                  }
                  vibeActions={vibeActions}
                  moreLikeTheseActions={
                    variables.enableMoreLikeThese
                      ? moreLikeTheseActions
                      : undefined
                  }
                  typeAheadHandler={typeAheadHandler}
                />
              </div>
            )}
            {renderFilterSection()}
            <div className="w-full"> {renderResultsHeader()}</div>
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
                    item={item}
                    subtitle={item.meta?.subtitle}
                    infoContent={item.embeddingText}
                    bottomRightLabel={item.meta?.imageLabel}
                    primaryColor={brandingConfiguration.colors.primary}
                    secondaryColor={brandingConfiguration.colors.secondary}
                    onMoreLikeThisClicked={() => {
                      demoActions.setQuery(
                        `${item.title} - ${item.description}`
                      );
                      demoActions.performMoreLikeThis(item.id);
                    }}
                    isDeveloperView={variables.isDeveloperViewToggled}
                    moreLikeTheseActions={
                      variables.enableMoreLikeThese
                        ? moreLikeTheseActions
                        : undefined
                    }
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
