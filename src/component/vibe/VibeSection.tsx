import useToggle from "hooks/useToggle";
import React from "react";
import VibeModal from "./VibeModal";
import Slider from "@mui/material/Slider";
import { UseVibeType } from "abstracts/VibeTypes";

const VibeSection = ({ useVibe }: { useVibe: UseVibeType }) => {
  const {
    boards,
    activeVibe,
    slideVibeOverallWeight,
    setSlideVibeOverallWeight,
  } = useVibe;
  const [isModalVisible, toggleModal] = useToggle();

  return (
    <>
      <span className="flex flex-col items-center gap">
        <button
          type="button"
          className=" border-[1px] h-12 w-20 rounded-lg border-gray-400 hover:bg-gray-50"
          data-testid="all-filters-button"
          onClick={() => toggleModal()}
        >
          <img
            src={activeVibe[0]?.image_url ?? boards[0]?.pins[0]?.image_url}
            alt="first-board"
            className="relative rounded-lg h-full w-full object-cover"
          />
        </button>
        <p className="line-clamp-1 mt-1 w-full text-center text-lg text-orange-700">
          VIBE INFLUENCE
        </p>
        <Slider
          color={"error"}
          step={0.01}
          max={1}
          value={slideVibeOverallWeight}
          onChange={(event, value) => {
            setSlideVibeOverallWeight(value as number);
          }}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
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
