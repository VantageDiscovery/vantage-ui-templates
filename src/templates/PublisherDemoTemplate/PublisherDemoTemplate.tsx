import { LinkIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { BrandingConfiguration } from "abstracts/DemoConfigurationTypes";
import PublishCard from "component/PublishCard";
import ServerResponseWrapper from "component/ServerResponseWrapper";
import ToggleButton from "component/ToggleButton";
import Chip from "component/filter/Chip";
import Navigation from "component/layout/Navigation";
import useDemo from "contexts/DemoContext";
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import cn from "utils/cn";

const PublisherDemoTemplate = ({
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

  const {
    activeFilters,
    availableFilters,
    clearActiveFilters,
    toggleFilters,
    getFilterString,
  } = filterActions;

  useEffect(() => {
    if (brandingConfiguration.pageTitle) {
      document.title = brandingConfiguration.pageTitle;
    }
  }, []);

  const searchResult = useMemo(() => searchResults[0], [searchResults]);

  const isNoResults = searchResult.items?.length === 0;
  const hasResults = !!searchResult.items && searchResult.items.length > 0;

  return (
    <div className="flex flex-col w-full gap-0 min-h-screen relative">
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
      <div className="grow w-full">
        <div className="flex justify-center animate-fade-in">
          <div className="flex flex-row w-full px-20">
            <aside className="pr-10 flex flex-col sticky top-[128px] left-0 py-4 gap-8 border-r h-fit">
              {availableFilters
                .filter(
                  (filter, index, array) =>
                    index ===
                    array.findIndex(
                      (element) => element.categorySlug === filter.categorySlug
                    )
                )
                .map((cat, index) => (
                  <section className="" key={index}>
                    <h3 className="text-xl font-bold text-gray-600 text-weight">
                      {cat.categoryName}
                    </h3>
                    <ul className="flex flex-col mt-4 gap-2">
                      {availableFilters
                        .filter((f) => f.categorySlug == cat.categorySlug)
                        .map((filter) => (
                          <li key={filter.slug}>
                            <button
                              className={cn("px-1 text-left rounded-md", {
                                "text-white": activeFilters?.includes(filter),
                              })}
                              style={{
                                backgroundColor: activeFilters?.includes(filter)
                                  ? brandingConfiguration.colors.primary
                                  : "#FAFAFA",
                              }}
                              onClick={() => {
                                toggleFilters([filter]);
                              }}
                            >
                              {filter.name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </section>
                ))}
              <div className="flex flex-col justify-center items-center gap-8 mt-10 pb-12">
                <ToggleButton
                  text="Developer debug"
                  checkedColor={brandingConfiguration.colors.primary}
                  isEnabled={variables.isDeveloperViewToggled}
                  setIsEnabled={demoActions.setIsDeveloperViewToggled}
                />
                <span className="border-t-[1px] border-t-gray-400">
                  <p className="text-xs text-center mt-2 text-gray-500">
                    All Rights Reserved by Vantage
                  </p>
                </span>
              </div>
            </aside>
            <main className="flex flex-col w-full py-4 pl-14 gap-4">
              <span className="flex w-full items-start justify-between">
                <form
                  className="w-full flex flex-col gap-4 relative"
                  onSubmit={(event) => {
                    event.preventDefault();
                    demoActions.performSearch();
                  }}
                >
                  <input
                    value={variables.query}
                    onChange={(event) =>
                      demoActions.setQuery(event.target.value)
                    }
                    placeholder={
                      brandingConfiguration.searchPlaceholder ??
                      "Search in natural language..."
                    }
                    type="text"
                    className="pl-3 block w-full rounded-xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:hover:cursor-not-allowed ring-gray-300 focus:ring-primary"
                  />
                  <SparklesIcon className="absolute right-4 top-4 w-4 h-4 text-orange-300" />
                  {!searchResult.isLoading &&
                    hasResults &&
                    searchResult.executionTime && (
                      <p>
                        You have {searchResult.items?.length} research results
                        in
                        <b>
                          &nbsp;{(searchResult.executionTime / 1000).toFixed(2)}
                          &nbsp;seconds
                        </b>
                        &nbsp;for &quot;{variables.query}&quot;
                        {dataConfiguration.originalSearchResultsURL && (
                          <Link
                            to={dataConfiguration.originalSearchResultsURL.replace(
                              "${query}",
                              variables.query
                            )}
                            target="_new"
                          >
                            <LinkIcon className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        )}
                      </p>
                    )}
                </form>
              </span>
              {activeFilters.length > 0 && (
                <p>
                  <button
                    onClick={() => {
                      clearActiveFilters();
                    }}
                    className="mr-2 hover:underline"
                  >
                    Clear active categories
                  </button>
                  <span className="inline flex-row space-x-2">
                    {activeFilters.map((filter) => (
                      <Chip
                        title={filter.name}
                        key={`${filter.categorySlug}-${filter.name}`}
                        isCancelVisible
                        isSelected
                        selectedColor={brandingConfiguration.colors.primary}
                        onCancel={() => toggleFilters([filter])}
                      />
                    ))}
                  </span>
                </p>
              )}
              {variables.isDeveloperViewToggled && activeFilters.length > 0 && (
                <div className="text-xl leading-none">{getFilterString()}</div>
              )}
              <ServerResponseWrapper
                isLoading={searchResult.isLoading}
                isError={false}
                isSuccess={searchResult.isSuccess}
                loadingMessage="Loading content"
                isNoResults={!searchResult.isLoading && isNoResults}
                loadingSpinnerColor="black"
              >
                <>
                  <section>
                    <ul className="flex flex-col gap-6">
                      {searchResult.items?.map((paper) => {
                        return (
                          <PublishCard
                            key={paper.id}
                            cardProperties={{
                              id: paper.id,
                              description: paper.description,
                              accuracy: paper.score || 0,
                              imageUrl: paper.imageSrc,
                              redirectUrl: paper.externalUrl,
                              subtitle: paper.meta?.subtitle,
                              tooltipContent: paper.embeddingText,
                              title: paper.title,
                            }}
                            primaryColor={brandingConfiguration.colors.primary}
                            secondaryColor={
                              brandingConfiguration.colors.secondary
                            }
                            isDeveloperView={variables.isDeveloperViewToggled}
                            onMoreLikeThis={(documentId: string) => {
                              demoActions.setQuery(`More Like: ${paper.title}`);
                              demoActions.performMoreLikeThis(documentId);
                            }}
                          />
                        );
                      })}
                    </ul>
                  </section>
                </>
              </ServerResponseWrapper>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherDemoTemplate;
