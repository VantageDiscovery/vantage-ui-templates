import { UseFiltersType } from "abstracts";
import ColorChip from "component/ColorChip";
import useToggle from "hooks/useToggle";
import FilterIcon from "icons/FilterIcon";
import React from "react";

const BubblesFilter = ({ useFilters }: { useFilters: UseFiltersType }) => {
  const { availableFilters, activeFilters, toggleFilters, clearActiveFilters } =
    useFilters;

  const [isVisible, toggleDropdown] = useToggle();

  return (
    <div className="flex w-full h-full items-center px-10 mt-2 relative">
      {/* <div className="relative flex flex-col mr-5 mt-1 w-fit h-full">
        <button className="rounded-full text-white" onClick={toggleDropdown}>
          <FilterIcon />
        </button>
        {isVisible && (
          <div className="absolute h-96 w-52 z-10 mt-16 -left-10 bg-white box-border shadow-md">
            AAAAAA
          </div>
        )}
      </div> */}

      <div className="flex w-full h-full items-center gap-1 overflow-x-scroll scrollbar-md">
        {availableFilters.map((filter, index) => (
          <ColorChip
            title={filter.name}
            key={filter.name}
            isSelected={activeFilters.includes(filter)}
            onClick={() => {
              toggleFilters([filter]);
            }}
            index={index + 1}
          />
        ))}
      </div>
      {/* {activeFilters.length > 0 ? (
        <button className="line-clamp-1 w-24 pl-5" onClick={clearActiveFilters}>
          <p className="line-clamp-1 w-fit hover:underline">Reset all</p>
        </button>
      ) : (
        <span className="w-24" />
      )} */}
    </div>
  );
};

export default BubblesFilter;
