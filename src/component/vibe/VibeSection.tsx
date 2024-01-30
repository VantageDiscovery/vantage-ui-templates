import useToggle from "hooks/useToggle";
import React from "react";
import VibeModal from "./VibeModal";
import { UseVibeType } from "abstracts/VibeTypes";

const VibeSection = ({ useVibe }: { useVibe: UseVibeType }) => {
  const { boards } = useVibe;
  const [isModalVisible, toggleModal] = useToggle();

  return (
    <>
      {boards.length > 0 ? (
        <span className="flex px-10 items-center gap-6">
          <button
            type="button"
            className=" border-[1px] h-10 w-16 rounded-lg border-gray-400 hover:bg-gray-50"
            data-testid="all-filters-button"
            onClick={() => toggleModal()}
          >
            <img
              src={boards[0]?.pins[0]?.image_url}
              alt="first-board"
              className="relative rounded-lg h-full w-full object-cover"
            />
          </button>
        </span>
      ) : (
        <span />
      )}

      <VibeModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        useVibe={useVibe}
      />
    </>
  );
};

export default VibeSection;
