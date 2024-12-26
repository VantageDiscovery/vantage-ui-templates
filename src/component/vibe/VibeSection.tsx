import useToggle from "hooks/useToggle";
import React from "react";
import VibeModal from "./VibeModal";
import { UseVibeType } from "abstracts/VibeTypes";
import PinterestLogo from "icons/PinterestLogo";

const VibeSection = ({ useVibe }: { useVibe: UseVibeType }) => {
  const { activeVibe } = useVibe;
  const [isModalVisible, toggleModal] = useToggle();

  const buttonModalSection = () => {
    return activeVibe[0] ? (
      <img
        src={activeVibe[0]?.image_base64 ?? activeVibe[0]?.image_url}
        alt="first-board"
        className="relative rounded-lg h-full w-full object-cover"
      />
    ) : (
      <PinterestLogo />
    );
  };

  return (
    <>
      <span className="flex flex-row-reverse w-full h-full items-center align-top">
        <div className="flex flex-col w-full">
          <button
            type="button"
            className=" border-[1px] h-12 w-28 rounded-lg border-gray-400 hover:bg-gray-50"
            data-testid="all-filters-button"
            onClick={toggleModal}
          >
            {buttonModalSection()}
          </button>
          <div className="w-[100px] mt-1 mr-1 ml-1.5 items-end"></div>
        </div>
        <span className="flex flex-col mb-6 justify-end w-full h-full text-xs">
          <p className="line-clamp-1 text-center align-text-top w-full text-xs">
            VIBE INFLUENCE
          </p>
        </span>
      </span>

      <VibeModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        useVibe={useVibe}
      />
    </>
  );
};

export default VibeSection;
