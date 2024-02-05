import { BoardData } from "abstracts/VibeTypes";
import CheckBoxIcon from "icons/CheckBoxIcon";
import React from "react";

const VibeCard = ({
  data,
}: {
  data: {
    props: BoardData;
    activeVibe: boolean;
    setActiveVibe: (properties: BoardData) => void;
  };
}) => {
  return (
    <div className="h-auto w-full p-1">
      <button
        className={"w-full h-full"}
        onClick={() => data.setActiveVibe(data.props)}
      >
        <img
          src={data.props.image_url}
          alt="vibe"
          className={`h-auto w-full rounded-3xl object-fill object-center ${
            data.activeVibe
              ? " outline-[2.5px] outline outline-[#E60023]"
              : "border-none opacity-50"
          }`}
        />
      </button>
      <div className="flex flex-row">
        <span className="text-sm font-semibold line-clamp-2 mx-1">
          {data.props.text}
        </span>
        <button onClick={() => data.setActiveVibe(data.props)}>
          <CheckBoxIcon stroke={`${data.activeVibe && "black"}`} />
        </button>
      </div>
    </div>
  );
};

export default VibeCard;
