import React from "react";
import Tooltip from "./Tooltip";
import {
  DocumentMagnifyingGlassIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { getFontColorBasedOnBackground } from "utils/colorUtils";
import { ProductCardProperties } from "abstracts/CardTypes";

const TooltipContent = ({ text }: { text: string }): JSX.Element => (
  <div className="flex flex-col gap-2 p-2 min-w-sm">
    <h1 className="font-semibold">Research Indexed Text</h1>
    {text && <p className="w-full">{text}</p>}
  </div>
);

const ProductCard = ({
  id,
  imageSrc,
  searchAccuracy,
  title,
  subtitle,
  description,
  bottomRightLabel,
  primaryColor,
  secondaryColor,
  isDeveloperView,
  redirectUrl,
  infoContent,
  onMoreLikeThisClicked,
}: ProductCardProperties) => {
  return (
    <article
      data-testid={`product-card-${id}`}
      className="flex flex-col gap-1 h-fit w-[300px] 3xl:w-[340px] box-border-2 shadow-md rounded-xl"
    >
      <a
        href={redirectUrl}
        target={redirectUrl ? "_blank" : ""}
        rel="external noreferrer"
        className="relative cursor-pointer"
      >
        <div className="flex w-full justify-center bg-gray-50 rounded-lg">
          <img
            src={imageSrc}
            alt="product"
            data-testid="product-image"
            className="relative rounded-lg h-[320px] w-full object-cover"
          />
          {isDeveloperView && (
            <span
              data-testid="product-card-search-accuracy"
              style={{ backgroundColor: primaryColor }}
              className="flex px-3.5 py-1.5 rounded-full gap-2 items-center justify-between top-3 left-3 absolute"
            >
              <DocumentMagnifyingGlassIcon className="w-4 h-4" />
              <p className="text-white text-sm font-medium ">
                {searchAccuracy?.toFixed(4)}
              </p>
            </span>
          )}
          {bottomRightLabel && (
            <p className="absolute bottom-3 right-3 px-2 py-0.5 text-sm bg-gray-600 rounded-lg text-white font-semibold">
              {bottomRightLabel}
            </p>
          )}
        </div>
      </a>
      {subtitle && (
        <span className="px-4 pt-2">
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </span>
      )}
      <div className="flex flex-col gap-4 px-4 pb-4 pt-2">
        <section className="flex justify-between items-center">
          <span className="h-6 line-clamp-1 font-bold text-base">{title}</span>
          {isDeveloperView && (
            <Tooltip content={<TooltipContent text={infoContent} />}>
              <InformationCircleIcon className="h-5 w-5" color={primaryColor} />
            </Tooltip>
          )}
        </section>
        <span className="font-normal text-gray-500 line-clamp-3 min-h-[70px]">
          <p>{description || "Unavailable"}</p>
        </span>
        <span className="flex w-full justify-end items-center gap-4">
          <button
            style={{
              backgroundColor: secondaryColor,
              color: getFontColorBasedOnBackground(secondaryColor),
            }}
            onClick={onMoreLikeThisClicked}
            className={`flex shrink-0 rounded-lg px-3 py-2 text-sm font-semibold transition-width duration-200 w-8 hover:w-36 h-9 hover:after:content-["_More_Like_This"] hover:after:animate-fade-in-fast`}
          >
            <p className="pr-2">+</p>
          </button>
        </span>
      </div>
    </article>
  );
};

export default ProductCard;
