import SearchIcon from "icons/SearchIcon";
import React, { ChangeEvent } from "react";
import Combobox from "../Combobox";
import cn from "utils/cn";
import { UseFiltersType } from "abstracts/FilterTypes";

const ProductSearchSection = ({
  searchQuery,
  onSearchPerformed,
  setSearchQuery,
  useFiltersHook,
  isSingleFilter,
}: {
  searchQuery: string;
  onSearchPerformed: () => void;
  setSearchQuery: (value: string) => void;
  useFiltersHook: UseFiltersType;
  isSingleFilter: boolean;
}) => {
  const { availableFilters, activeFilters, toggleFilters, clearActiveFilters } =
    useFiltersHook;

  const activeFilter = activeFilters[0];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearchPerformed();
      }}
      className="flex w-full justify-center gap-6"
    >
      <span className="flex border border-black text-gray-900 text-sm rounded-lg w-full gap-2 pl-2">
        <SearchIcon className="w-6 h-auto fill-gray-60" />
        <input
          placeholder="Search for anything..."
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
            />
          </span>
        )}
      </span>
      <button
        className="bg-black text-white rounded-xl px-10 font-bold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        type="submit"
        // disabled={!isFormValid}
      >
        Search
      </button>
    </form>
  );
};

export default ProductSearchSection;
