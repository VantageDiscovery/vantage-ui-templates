import React, { ChangeEvent, useMemo } from "react";
import Combobox from "../Combobox";
import cn from "utils/cn";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ProductSearchProperies } from "abstracts";
import VibeSection from "component/vibe/VibeSection";
import DislikeIcon from "icons/DislikeIcon";
import EmptyImageIcon from "icons/EmptyImageIcon";
import LikeIcon from "icons/LikeIcon";

const ProductSearchSection = ({
  searchQuery,
  onSearchPerformed,
  setSearchQuery,
  useFiltersHook,
  isSingleFilter,
  searchPlaceholder = "Search for anything...",
  vibeActions,
  moreLikeTheseActions,
}: ProductSearchProperies) => {
  const { availableFilters, activeFilters, toggleFilters, clearActiveFilters } =
    useFiltersHook;

  const renderVibe = () => {
    return vibeActions?.boards?.length ? (
      <div className="w-1/6">
        <VibeSection useVibe={vibeActions} />
      </div>
    ) : (
      <></>
    );
  };

  const renderSelectedMLTImages = () => {
    if (!moreLikeTheseActions) return <></>;
    return moreLikeTheseActions?.activeMLThese.length ? (
      moreLikeTheseActions.activeMLThese.slice(0, 3).map((data) => {
        return (
          <img
            key={data.item.id}
            alt={data.item.id}
            src={data.item.imageSrc}
            className="object-fill h-12 w-full"
          />
        );
      })
    ) : (
      <span className="flex flex-col items-center">
        <EmptyImageIcon />
        Add like or dislike
      </span>
    );
  };

  const renderMoreLikeTheseSelectedSection = () => {
    return moreLikeTheseActions ? (
      <>
        <DislikeIcon fill="black" stroke="black" width="32" height="32" />
        <button
          disabled={moreLikeTheseActions.activeMLThese.length === 0}
          onClick={moreLikeTheseActions.toggleActivate}
          className="border-black border-[1px] justify-center items-center flex rounded-md w-full h-full"
        >
          {renderSelectedMLTImages()}
        </button>
        <LikeIcon fill="black" width="32" height="32" stroke="black" />
      </>
    ) : (
      <></>
    );
  };

  const activeFilter = useMemo(() => activeFilters[0], [activeFilters]);

  return (
    <div className="w-full flex xl:flex-row md:flex-col justify-between">
      <div className="flex w-full flex-1 xl:flex-row md:flex-col justify-end gap-2">
        {renderVibe()}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearchPerformed();
          }}
          className="flex w-4/5 h-12 justify-center gap-6"
        >
          <span className="flex flex-row items-center border border-black text-gray-900 text-sm rounded-lg w-full gap-2 pl-2">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-600" />
            <input
              placeholder={searchPlaceholder}
              type="text"
              data-testid="search-input"
              className={cn(
                "h-full py-3 !focus:ring-0 outline-0",
                isSingleFilter
                  ? "w-3/5 border-r-[1px] border-r-gray-400"
                  : "w-full rounded-lg"
              )}
              value={searchQuery}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(event.target.value);
              }}
            />
            {isSingleFilter && (
              <span className="w-2/5 h-full mr-2">
                <Combobox
                  className="w-full h-full !border-0"
                  placeholder="Select optional category"
                  data={availableFilters
                    .map((category) => category.name)
                    .filter(Boolean)}
                  activeValue={activeFilter?.name}
                  onSelectedAction={(selectedValue?: string) => {
                    if (!selectedValue) {
                      clearActiveFilters();
                      return;
                    }
                    const filter = availableFilters?.find(
                      (filter) => filter.name === selectedValue
                    );
                    if (filter) {
                      toggleFilters([filter]);
                    }
                  }}
                  allowNoValue={true}
                />
              </span>
            )}
          </span>
          <button
            className="bg-black text-white rounded-xl px-10 font-bold disabled:hover:bg-black hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex w-1/6 ml-8 h-full items-center gap-4">
        {renderMoreLikeTheseSelectedSection()}
      </div>
    </div>
  );
};

export default ProductSearchSection;
