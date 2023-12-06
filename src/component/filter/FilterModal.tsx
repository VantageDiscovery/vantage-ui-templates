import { XMarkIcon } from "@heroicons/react/24/outline";
import { Filter, UseFiltersType } from "abstracts/FilterTypes";
import Modal from "component/layout/Modal";
import React, { useEffect, useMemo, useState } from "react";
import Chip from "./Chip";

const FilterModal = ({
  isModalVisible,
  toggleModal,
  useFilters,
}: {
  isModalVisible: boolean;
  toggleModal: () => void;
  useFilters: UseFiltersType;
}) => {
  const { activeFilters, setActiveFilters, availableFilters } = useFilters;

  const [activeFiltersLocally, setActiveFiltersLocally] =
    useState(activeFilters);

  useEffect(() => {
    if (isModalVisible) {
      setActiveFiltersLocally(activeFilters);
    }
  }, [activeFilters, isModalVisible]);

  const filtersByCategory = useMemo(() => {
    return availableFilters.reduce((accumulator, current) => {
      if (!accumulator[current.categorySlug]) {
        accumulator[current.categorySlug] = [];
      }
      accumulator[current.categorySlug].push(current);
      return accumulator;
    }, {} as Record<string, Filter[]>);
  }, [availableFilters]);

  const onModalClose = () => {
    toggleModal();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      className="flex flex-col w-1/2 h-2/3 bg-white rounded-lg py-6 gap-5"
      onCloseModal={onModalClose}
    >
      <>
        <header className="flex w-full px-6 justify-between">
          <span className="flex justify-center w-full">
            <h1 className="uppercase tracking-widest text-lg">Recipe Filter</h1>
          </span>
          <button
            onClick={() => {
              onModalClose();
            }}
            className="flex justify-end"
          >
            <XMarkIcon className="w-5" />
          </button>
        </header>
        <hr></hr>
        <div className="flex flex-col gap-5 overflow-y-scroll">
          {Object.entries(filtersByCategory)?.map((section) => (
            <ModalFiltersSection
              isFilterSelected={(filter) =>
                activeFiltersLocally.includes(filter)
              }
              onFilterClick={(filter) => {
                if (!activeFiltersLocally.includes(filter)) {
                  setActiveFiltersLocally([...activeFiltersLocally, filter]);
                } else {
                  setActiveFiltersLocally(
                    activeFiltersLocally.filter((f) => f.slug !== filter.slug)
                  );
                }
              }}
              key={`${section[0]}`}
              filterSection={section}
            />
          ))}
        </div>
        <section className="flex w-full justify-between px-6 py-2">
          <button
            className="underline text-gray-500"
            onClick={() => {
              setActiveFiltersLocally([]);
            }}
          >
            Clear all
          </button>
          <button
            onClick={() => {
              setActiveFilters(activeFiltersLocally);
              onModalClose();
            }}
            className="px-6 py-2 text-white font-semibold bg-green-500 rounded-2xl"
          >
            Apply filters
          </button>
        </section>
      </>
    </Modal>
  );
};

export default FilterModal;

const ModalFiltersSection = ({
  filterSection,
  isFilterSelected,
  onFilterClick,
}: {
  filterSection: [string, Filter[]];
  isFilterSelected: (filter: Filter) => boolean;
  onFilterClick: (filter: Filter) => void;
}) => {
  const [isShowMore, setIsShowMore] = useState(
    filterSection[1].length > 10 ? false : undefined
  );
  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  return (
    <>
      <section className="flex flex-col gap-3 px-6">
        <h1 className="text-lg font-semibold">
          {/* TODO: Probably should refactor, not sure if string is actually needed as first in filterSection prop */}
          {filterSection[1][0].categoryName}
          {/* {categoryNames[filterSection[0]]} */}
        </h1>
        <span className="flex flex-wrap gap-4">
          {(isShowMore ? filterSection[1] : filterSection[1].slice(0, 8)).map(
            (filter) => (
              <Chip
                title={filter.name}
                key={`${filter.categorySlug}-${filter.name}`}
                isSelected={isFilterSelected(filter)}
                selectedColor="black"
                onClick={() => {
                  onFilterClick(filter);
                }}
              />
            )
          )}
        </span>
        {isShowMore !== undefined && (
          <span className="flex justify-start pt-2">
            <button
              className="underline font-bold"
              onClick={() => {
                toggleShowMore();
              }}
            >
              Show {isShowMore ? "Less" : "More"}
            </button>
          </span>
        )}
      </section>
      <hr></hr>
    </>
  );
};
