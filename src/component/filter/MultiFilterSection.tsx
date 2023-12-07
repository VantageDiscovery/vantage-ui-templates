import { FunnelIcon } from "@heroicons/react/24/outline";
import { Filter, UseFiltersType } from "abstracts/FilterTypes";
import useToggle from "hooks/useToggle";
import React from "react";
import Chip from "./Chip";
import FilterModal from "./FilterModal";

const MultiFilterSection = ({ useFilters }: { useFilters: UseFiltersType }) => {
  const { activeFilters, toggleFilters, clearActiveFilters, popularFilters } =
    useFilters;
  const [isModalVisible, toggleModal] = useToggle();

  return (
    <div className="flex flex-col">
      <div className="px-24 flex w-full py-1 gap-4 items-center justify-between">
        {popularFilters.length > 0 ? (
          <span className="flex items-center gap-6">
            <p className="text-lg font-semibold whitespace-nowrap">
              Most popular filters:
            </p>
            <span className="flex flex-wrap gap-4">
              {popularFilters.map((filter) => (
                <Chip
                  key={`${filter.categorySlug}-${filter.name}`}
                  title={filter.name}
                  isSelected={activeFilters.includes(filter)}
                  onClick={() => toggleFilters([filter])}
                />
              ))}
            </span>
          </span>
        ) : (
          <span />
        )}
        <span className="flex gap-4">
          <button
            type="button"
            className="px-6 py-2 border-[1px] rounded-2xl border-gray-400 hover:bg-gray-50"
            data-testid="all-filters-button"
            onClick={() => toggleModal()}
          >
            <span className="flex justify-between items-center gap-2">
              <FunnelIcon className="w-4 h-4" />
              <p className="flex font-medium uppercase tracking-wider">
                Filters
              </p>
            </span>
          </button>
        </span>
        <FilterModal
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          useFilters={useFilters}
        />
      </div>
      {activeFilters.length > 0 && (
        <div className="px-24 flex flex-row space-x-5 mt-8 pt-8 border-t">
          <button
            className="w-24 hover:underline text-left"
            onClick={() => {
              clearActiveFilters();
            }}
          >
            Reset all
          </button>
          <span className="flex w-full gap-3">
            {activeFilters.map((filter: Filter) => (
              <Chip
                title={filter.name}
                key={`${filter.categorySlug}-${filter.name}`}
                isCancelVisible
                isSelected
                onCancel={() => toggleFilters([filter])}
              />
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default MultiFilterSection;
