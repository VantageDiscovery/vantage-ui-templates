import React, { useState } from "react";
import cn from "utils/cn";

type ChipProperties = {
  title: string;
  color?: string;
  isSelected?: boolean;
  isCancelVisible?: boolean;
  textColor?: string;
  imgSrc?: string;
  onClick?: () => void;
  onCancel?: () => void;
};

const getRandomColor = (): string => {
  return (
    "#" +
    Math.floor(Math.random() * 9) +
    Math.floor(Math.random() * 9) +
    Math.floor(Math.random() * 9) +
    Math.floor(Math.random() * 9) +
    Math.floor(Math.random() * 9) +
    Math.floor(Math.random() * 9)
  );
};

const VibeChip = ({
  title,
  isSelected,
  isCancelVisible,
  onClick,
  onCancel,
  imgSrc,
  textColor = "white",
}: ChipProperties) => {
  const [color] = useState(getRandomColor());
  return (
    <button
      type="button"
      className={cn("px-1 border-[1px] h-12 rounded-4xl", {
        "mx-2 outline outline-2 outline-black": isSelected,
      })}
      style={{ backgroundColor: color, color: textColor }}
      onClick={() => onClick?.()}
    >
      <span className="flex w-full justify-between items-center gap-3">
        <img
          src={imgSrc}
          alt="vibe-tag"
          className="h-10 w-12 rounded-4xl object-cover"
        ></img>
        <p className="flex w-full text-xs font-semibold uppercase whitespace-nowrap">
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
          ></span>
        )}
      </span>
    </button>
  );
};

export default VibeChip;
