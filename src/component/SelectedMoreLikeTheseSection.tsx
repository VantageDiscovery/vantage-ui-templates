import React, { useEffect, useRef, useState } from "react";
import SelectedCardsMlt from "./MoreLikeTheseCards/SelectedCardsMlt";
import {
  SelectedMoreLikeTheseCard,
  useMoreLikeTheseType,
} from "abstracts/useMoreLikeTheseType";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import ToggleButton from "./ToggleButton";
import { DataConfiguration, UseFiltersType } from "abstracts";

const OFFSET_SCROLL = 300;

const sortByLike = (
  value1: SelectedMoreLikeTheseCard,
  value2: SelectedMoreLikeTheseCard
) => {
  if (value1.liked && !value2.liked) return -1;
  if (!value1.liked && value2.liked) return 1;
  return 0;
};

const SelectedMoreLikeTheseSection = ({
  moreLikeTheseActions,
  isDeveloperViewToggled,
  primaryColor,
  secondaryColor,
  setIsDeveloperViewToggled,
  filterActions,
  dataConfiguration,
}: {
  moreLikeTheseActions: useMoreLikeTheseType;
  isDeveloperViewToggled: boolean;
  setIsDeveloperViewToggled: (isEnabled: boolean) => void;
  filterActions: UseFiltersType;
  primaryColor: string;
  secondaryColor: string;
  dataConfiguration: DataConfiguration;
}) => {
  const reference = useRef<HTMLDivElement>(null);

  const [isScrollVisible, setIsScrollVisible] = useState(false);

  useEffect(() => {
    checkScroll();
  }, []);

  //show the scroll button if our main container is smaller than our content width
  const checkScroll = () => {
    if (
      reference &&
      reference.current &&
      reference.current.scrollWidth > reference.current.clientWidth
    ) {
      setIsScrollVisible(true);
    } else {
      setIsScrollVisible(false);
    }
  };

  const onScroll = (offset: number) => {
    if (reference && reference.current) {
      reference.current.scrollBy({ behavior: "smooth", left: offset });
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full px-16">
        <div className="flex justify-between w-full h-full">
          <button
            className="flex items-center gap-3 w-full font-bold"
            onClick={moreLikeTheseActions.toggleActivate}
          >
            <ArrowLeftIcon width={"15px"} /> Back to Search Results
          </button>
          <div className="px-24 w-full flex flex-row space-x-5 justify-end items-center">
            <ToggleButton
              text="Developer debug"
              checkedColor={primaryColor}
              isEnabled={isDeveloperViewToggled}
              setIsEnabled={setIsDeveloperViewToggled}
              dataConfiguration={dataConfiguration}
            />
            {isDeveloperViewToggled &&
              filterActions.activeFilters.length > 0 && (
                <div className="text-xl leading-none">
                  {filterActions.getFilterString()}
                </div>
              )}
          </div>
        </div>
        <span className="flex justify-center w-full text-2xl font-bold">
          Similar to These
        </span>
        <div className="flex w-full h-full items-center px-10 mt-2">
          {isScrollVisible && (
            <span className="h-full pb-4 rounded-full">
              <button
                className="h-full flex items-center hover:bg-gray-100 px-1 "
                onClick={() => onScroll(-OFFSET_SCROLL)}
              >
                <ChevronLeftIcon width={"15px"} />
              </button>
            </span>
          )}
          <div
            ref={reference}
            className="flex w-full h-full gap-4 overflow-scroll scrollbar-small"
          >
            {moreLikeTheseActions.activeMLThese.sort(sortByLike).map((data) => (
              <SelectedCardsMlt
                item={data.item}
                liked={data.liked}
                key={data.item.id}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                isDeveloperView={isDeveloperViewToggled}
                moreLikeTheseActions={moreLikeTheseActions}
              />
            ))}
          </div>
          {isScrollVisible && (
            <span className="h-full pb-4 rounded-full">
              <button
                className="h-full px-1 hover:bg-gray-100"
                onClick={() => onScroll(OFFSET_SCROLL)}
              >
                <ChevronRightIcon width={"17px"} />
              </button>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectedMoreLikeTheseSection;
