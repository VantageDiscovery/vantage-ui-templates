import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import cn from "utils/cn";

type ChipProperties = {
  title: string;
  selectedColor?: string;
  isSelected?: boolean;
  isCancelVisible?: boolean;
  textColor?: string;
  onClick?: () => void;
  onCancel?: () => void;
};

const Chip = ({
  title,
  isSelected,
  isCancelVisible,
  selectedColor = "black",
  textColor = "white",
  onClick,
  onCancel,
}: ChipProperties) => {
  return (
    <button
      type="button"
      className={cn("px-3 py-2 border-[1px] rounded-xl", {
        "hover:bg-gray-50 border-gray-800": !isSelected,
      })}
      style={
        isSelected ? { backgroundColor: selectedColor, color: textColor } : {}
      }
      onClick={() => onClick && onClick()}
    >
      <span className="flex w-full justify-between items-center gap-3">
        <p className="flex w-full text-sm font-semibold uppercase whitespace-nowrap">
          {title}
        </p>
        {isCancelVisible && (
          // This is intentional.
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <span
            onClick={(event) => {
              event.preventDefault();
              onCancel && onCancel();
            }}
            className="hover:pointer-cursor"
            data-testid={`chip-close-${title}`}
          >
            <XMarkIcon className={`w-4 fill-${textColor}`} />
          </span>
        )}
      </span>
    </button>
  );
};

export default Chip;
