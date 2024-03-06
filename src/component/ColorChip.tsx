import React, { useState } from "react";
import cn from "utils/cn";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getRandomColor } from "utils/colorUtils";

type ChipProperties = {
  title: string;
  color?: string;
  isSelected?: boolean;
  index?: number;
  isCancelVisible?: boolean;
  textColor?: string;
  imgSrc?: string;
  onClick?: () => void;
  onCancel?: () => void;
};

const ColorChip = ({
  title,
  isSelected,
  isCancelVisible,
  onClick,
  onCancel,
  imgSrc,
  index,
}: ChipProperties) => {
  const [color] = useState(getRandomColor(index ?? 1));
  return (
    <button
      type="button"
      className={cn("px-1 h-12 rounded-4xl  hover:opacity-70", {
        "mx-2 outline outline-2 outline-black": isSelected,
        "px-4": !imgSrc,
      })}
      style={{ backgroundColor: color, color: "rgb(0, 0, 0)" }}
      onClick={() => onClick?.()}
    >
      <span className="flex w-full justify-between items-center gap-3">
        {imgSrc && (
          <img
            src={imgSrc}
            alt="vibe-tag"
            className="h-10 w-12 rounded-4xl object-cover"
          />
        )}
        <p className="flex w-full text-xs text-black uppercase whitespace-nowrap">
          {title}
        </p>
        {isCancelVisible && (
          // This is intentional.
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <span
            onClick={(event) => {
              event.preventDefault();
              onCancel?.();
            }}
            className="hover:pointer-cursor"
            data-testid={`chip-close-${title}`}
          >
            <XMarkIcon width={"18px"} color="black" />
          </span>
        )}
      </span>
    </button>
  );
};

export default ColorChip;
