import { BoardData } from "abstracts/VibeTypes";
import CheckBoxIcon from "icons/CheckBoxIcon";
import React from "react";
import cn from "utils/cn";

const VibeCard = ({
  data,
  activeVibe,
  setActiveVibe,
}: {
  data: BoardData;
  activeVibe: boolean;
  setActiveVibe: (properties: BoardData) => void;
}) => {
  return (
    <div className="h-auto w-full flex-wrap items-end justify-end">
      <button
        className={"w-full h-full flex-wrap "}
        onClick={() => setActiveVibe(data)}
      >
        <img
          src={data.image_url}
          alt="vibe"
          className={cn(
            "h-auto w-full rounded-3xl object-fill object-center",
            activeVibe
              ? "outline-[2.5px] outline outline-pinterest-primary"
              : "border-none opacity-50"
          )}
        />
      </button>
      {data.text && (
        <div className="flex flex-row ">
          <span className="text-sm font-semibold line-clamp-2 mx-1">
            {data.text}
          </span>
          <button onClick={() => setActiveVibe(data)}>
            <CheckBoxIcon stroke={`${activeVibe && "black"}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VibeCard;
