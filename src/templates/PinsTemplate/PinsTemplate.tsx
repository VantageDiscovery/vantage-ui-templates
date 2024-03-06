import { LinkIcon } from "@heroicons/react/24/outline";
import { BrandingConfiguration } from "abstracts";
import ProductCard from "component/ProductCard";
import { ProductResultsHeader } from "component/ProductResultsHeader";
import SelectedMoreLikeTheseSection from "component/SelectedMoreLikeTheseSection";
import ServerResponseWrapper from "component/ServerResponseWrapper";
import ToggleButton from "component/ToggleButton";
import BubblesFilter from "component/filter/BubblesFilter";
import Footer from "component/layout/Footer";
import Modal from "component/layout/Modal";
import Navigation from "component/layout/Navigation";
import ProductSearchSection from "component/search/ProductSearchSection";
import useDemo from "contexts/DemoContext";
import useToggle from "hooks/useToggle";
import React, { useEffect, useMemo, useState } from "react";
import Masonry from "react-layout-masonry";
import { Link } from "react-router-dom";
import sessionStorageService from "services/SessionStorageService";
import cn from "utils/cn";

const ANIMATION_DURATION = 3000;

const PinsTemplate = ({
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
    checkForError,
    moreLikeTheseActions,
  } = useDemo();

  const [isVisible, toggleModal] = useToggle();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      checkForError();
    } catch (error) {
      toggleModal();
      setErrorMessage((error as Error).message);
    }
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
      return <></>;
    }
    return <BubblesFilter useFilters={filterActions} />;
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
          <div className="flex flex-col items-center w-full gap-4">
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
                  isSingleFilter={false}
                  vibeActions={vibeActions}
                  moreLikeTheseActions={moreLikeTheseActions}
                />
              </div>
            )}
            <div className="w-full px-10">{renderFilterSection()}</div>
            <div className="w-full py-2"> {renderResultsHeader()}</div>
            <ServerResponseWrapper
              isLoading={searchResult.isLoading}
              isError={searchResult.isError}
              isSuccess={searchResult.isSuccess}
              isNoResults={
                !searchResult.isLoading && searchResult.items.length === 0
              }
            >
              <div className="flex pl-32 pr-24 pb-2 h-full w-full overflow-y-scroll scrollbar-small">
                <Masonry
                  gap={25}
                  columns={{ 640: 1, 768: 2, 1024: 3, 1280: 4, 1440: 5 }}
                >
                  {searchResult.items.map((item, index) => (
                    <ProductCard
                      key={index}
                      item={item}
                      subtitle={item.meta?.subtitle}
                      infoContent={item.embeddingText}
                      searchAccuracy={item.score}
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
                      staticHeight={false}
                      moreLikeTheseActions={
                        variables.enableMoreLikeThis
                          ? moreLikeTheseActions
                          : undefined
                      }
                    />
                  ))}
                </Masonry>
              </div>
            </ServerResponseWrapper>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isVisible={isVisible}
        className="flex flex-col items-centar justify-center bg-black w-1/3 h-1/3"
      >
        <div className="items-center flex flex-col w-full h-full justify-center p-12">
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_12_11)">
              <path
                d="M35 70C54.33 70 70 54.33 70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 54.33 15.67 70 35 70Z"
                fill="#D72828"
              />
              <path
                d="M31.7188 54.6875H38.2812V48.125H31.7188V54.6875ZM31.7188 13.125V41.5625H38.2812V13.125H31.7188Z"
                fill="#E6E6E6"
              />
            </g>
            <defs>
              <clipPath id="clip0_12_11">
                <rect width="70" height="70" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="flex w-full h-full text-center items-center justify-center text-red-500">
            {errorMessage}
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default PinsTemplate;
