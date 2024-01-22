import SpinnerIcon from "icons/SpinnerIcon";
import React from "react";
import {
  DocumentMagnifyingGlassIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";
import { getFontColorBasedOnBackground } from "utils/colorUtils";
import { PublishCardProperties } from "abstracts/CardTypes";

// TODO: This is duplicated from ProductCard and should be merged into a single component
const TooltipContent = ({
  text,
  isLoading,
  primaryColor,
}: {
  text: string;
  isLoading: boolean;
  primaryColor: string;
}): JSX.Element => (
  <div className="flex flex-col gap-2 p-2 min-w-sm">
    <h1 className="font-semibold">Research Indexed Text</h1>
    {isLoading && (
      <span className="flex w-full justify-center">
        <SpinnerIcon className="w-6 h-6" color={primaryColor} />
      </span>
    )}
    {text && <p className="w-full">{text}</p>}
  </div>
);

const PublishCard = ({
  cardProperties,
  isDeveloperView,
  onMoreLikeThis,
  secondaryColor,
}: PublishCardProperties) => {
  return (
    <article className="flex w-full h-[200px] shadow-md rounded-lg bg-white border-[1px]">
      <div className="w-1/5">
        <a
          href={cardProperties.redirectUrl}
          target={cardProperties.redirectUrl ? "_blank" : ""}
          rel="external noreferrer"
          className="relative cursor-pointer"
        >
          <div className="flex w-full justify-center bg-gray-50 rounded-lg p-5 bg-publisher-orange-100">
            <img
              src={cardProperties.imageUrl}
              alt="product"
              data-testid="product-image"
              className="relative rounded-lg h-[160px] w-full object-cover"
            />
          </div>
        </a>
      </div>
      <div className="flex w-4/5 flex-col p-5 justify-between">
        <section className="flex w-full justify-between">
          <span className="flex flex-col gap-2 mb-1">
            <h4 className="text-sm text-gray-400">{cardProperties.subtitle}</h4>
            <span className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {cardProperties.title}
              </h2>
              {isDeveloperView && (
                <Tooltip
                  content={
                    <TooltipContent
                      text={cardProperties.tooltipContent}
                      isLoading={false}
                      primaryColor={"black"}
                    />
                  }
                >
                  <InformationCircleIcon className="w-4 h-4 text-black" />
                </Tooltip>
              )}
            </span>
          </span>
          {isDeveloperView && (
            <span
              data-testid="product-card-search-accuracy"
              className="flex px-3.5 h-8 rounded-full gap-2 items-center justify-between border-[1px] border-black"
            >
              <DocumentMagnifyingGlassIcon className="w-4 h-4" />
              <p className="text-sm font-medium ">
                {cardProperties.accuracy.toFixed(6)}
              </p>
            </span>
          )}
        </section>
        <section className="flex flex-col justify-between h-full gap-2">
          <p className="leading-5 text-gray-600 line-clamp-3">
            {cardProperties.description}
          </p>
          {onMoreLikeThis && (
            <span className="flex justify-end items-center gap-4">
              <button
                style={{
                  backgroundColor: secondaryColor,
                  color: getFontColorBasedOnBackground(secondaryColor),
                }}
                onClick={() => {
                  onMoreLikeThis?.(cardProperties.id);
                }}
                className="flex bg-vantage-primary text-white shrink-0 rounded-md px-3 py-2 text-sm font-semibold w-36 h-9  hover:bg-vantage-primary-hovered"
              >
                + More Like This
              </button>
            </span>
          )}
        </section>
      </div>
    </article>
  );
};

export default PublishCard;
