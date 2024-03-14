import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Filter } from "abstracts";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import cn from "utils/cn";
import Chip from "./filter/Chip";

type DropdownProperties = {
  data?: string[];
  recomendedFilters?: Filter[];
  searchQuery: string;
  isSingleFilter: boolean;
  searchPlaceholder: string;
  isSelectedFilter: (filter: Filter) => boolean;
  onSelectedActionQuery: (selectedValue: string) => void;
  onSelectedActionFilter: (filter: Filter) => void;
  isDropDownOpen: boolean;
  setIsDropDownOpen: (open: boolean) => void;
  onSearchPerformed: () => void;
  className?: string;
};

const Dropdown = ({
  data,
  onSelectedActionQuery,
  setIsDropDownOpen,
  isDropDownOpen,
  searchPlaceholder,
  isSingleFilter,
  searchQuery,
  isSelectedFilter,
  recomendedFilters,
  onSelectedActionFilter,
  onSearchPerformed,
}: DropdownProperties) => {
  const reference = useRef<HTMLDivElement>(null);

  const [keyboardSelectedIndex, setKeyboardSelectedIndex] = useState<number>();

  const handleClickForDropdown = (event: MouseEvent) => {
    if (
      isDropDownOpen &&
      reference.current &&
      !reference.current.contains(event.target as Node)
    ) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickForDropdown);

    return () => {
      document.removeEventListener("click", handleClickForDropdown);
    };
  }, [isDropDownOpen]);

  const renderRecomendedFilters = () => {
    return (
      recomendedFilters && (
        <div className="flex flex-wrap items-center gap-2 text-center justify-start w-full h-full p-1 ">
          {recomendedFilters.map((filter, index) => {
            return (
              <Chip
                key={filter.name + index}
                title={filter.name}
                onClick={() => onSelectedActionFilter(filter)}
                isSelected={isSelectedFilter(filter)}
              />
            );
          })}
        </div>
      )
    );
  };

  return (
    <div className="relative w-full h-full" ref={reference}>
      <span className="w-full h-full flex p-1 gap-3 items-center">
        <MagnifyingGlassIcon className="w-6 h-6 flex text-gray-600" />
        <input
          placeholder={searchPlaceholder}
          type="text"
          data-testid="search-input"
          className={cn(
            "h-full py-3 w-full !focus:ring-0 outline-0",
            isSingleFilter ? " border-r-[1px] border-r-gray-400" : "rounded-lg"
          )}
          value={searchQuery}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onSelectedActionQuery(event.target.value);
            setIsDropDownOpen(true);
            event.stopPropagation();
          }}
          onKeyDown={(event) => {
            if (!data) return;
            if (event.key === "Enter") {
              keyboardSelectedIndex &&
                onSelectedActionQuery(data[keyboardSelectedIndex - 1]);
              event.stopPropagation();
            }
            if (event.key === "ArrowDown") {
              setKeyboardSelectedIndex(
                Math.min((keyboardSelectedIndex ?? -1) + 1, Number(data.length))
              );
            }
            if (event.key === "ArrowUp")
              keyboardSelectedIndex &&
                setKeyboardSelectedIndex(
                  Math.max(keyboardSelectedIndex - 1, -1)
                );
          }}
        />
      </span>
      {isDropDownOpen && searchQuery.length > 0 && (
        <div
          className="absolute rounded shadow bg-white overflow-x-hidden visible w-full border border-gray-200 z-10 flex-col flex"
          role="menu"
          tabIndex={0}
        >
          {data?.map((unit, index) => (
            <div
              className={cn(
                "cursor-pointer group border-b text-lg leading-10 flex items-center pl-2",
                { "bg-blue-300": index + 1 === keyboardSelectedIndex }
              )}
              key={unit + index}
              role="listbox"
              tabIndex={0}
              onClick={(event) => {
                onSelectedActionQuery(unit);
                onSearchPerformed();
                event.stopPropagation();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSelectedActionQuery(unit);
                }
              }}
            >
              {unit}
            </div>
          ))}
          {renderRecomendedFilters()}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
