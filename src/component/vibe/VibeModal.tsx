import { XMarkIcon } from "@heroicons/react/24/outline";
import { VibeActions } from "abstracts";
import { BoardData, UseVibeType, VibeBoard } from "abstracts/VibeTypes";
import Combobox from "component/Combobox";
import Modal from "component/layout/Modal";
import React, { useEffect, useState } from "react";

const toggleVibe = (
  activeVibe: BoardData[],
  toggledData: BoardData[] // Will have only first time always.
): BoardData[] => {
  if (!toggledData || !activeVibe) return [];
  const [activatedVibe, deactivatedVibe] = toggledData.reduce(
    (accumulator: [BoardData[], BoardData[]], current: BoardData) => {
      const [activatedFiltersIndex, deactivatedFiltersIndex] = [0, 1];
      const isDeactivated = activeVibe.includes(current);
      if (isDeactivated) {
        accumulator[deactivatedFiltersIndex].push(current);
        return accumulator;
      }
      accumulator[activatedFiltersIndex].push(current);
      return accumulator;
    },
    [[], []]
  );
  return [
    // Deactivate some
    ...activeVibe.filter((selected) => !deactivatedVibe.includes(selected)),
    // Activate some
    ...activatedVibe,
  ];
};

const VibeModal = ({
  isModalVisible,
  toggleModal,
  useVibe,
}: {
  isModalVisible: boolean;
  toggleModal: () => void;
  useVibe: UseVibeType;
}) => {
  const { boards, changeActiveVibe } = useVibe;
  const [activeBoard, setActiveBoard] = useState<VibeBoard>(
    boards[0] ?? { name: "", pins: [] }
  );

  const [currentVibe, setCurrentVibe] = useState<BoardData[]>(
    activeBoard?.pins
  );

  useEffect(() => {
    setActiveBoard(boards[0]);
  }, [boards]);

  useEffect(() => {
    setCurrentVibe(activeBoard?.pins);
  }, [activeBoard]);

  const onModalClose = () => {
    changeActiveVibe(currentVibe);
    toggleModal();
  };

  const setActivateVibe = (data: BoardData) => {
    setCurrentVibe(toggleVibe(currentVibe, [data]));
  };

  const isVibeActive = (data: BoardData): boolean => {
    return currentVibe?.includes(data);
  };

  const selectActiveBoard = (selectedValue?: string) => {
    setActiveBoard(
      boards.find((board) => board.name === selectedValue) ?? boards[0]
    );
  };

  return (
    <Modal
      isVisible={isModalVisible}
      className="flex flex-col w-1/2 h-2/3 bg-white rounded-lg py-6 gap-5"
      onCloseModal={onModalClose}
    >
      <>
        <header className="flex w-full px-6 justify-between">
          <span className="flex justify-center w-full">
            <h1 className="uppercase tracking-widest text-lg">
              Choose your Vibe, Influence your results!
            </h1>
          </span>
          <button
            onClick={() => {
              onModalClose();
            }}
            className="flex justify-end"
          >
            <XMarkIcon className="w-5" />
          </button>
        </header>

        <div className="px-5">
          <Combobox
            className="w-full h-full !border-0"
            placeholder="Select board"
            data={boards?.map((board) => board.name) ?? []}
            activeValue={activeBoard?.name ?? boards[0]?.name}
            onSelectedAction={(selectedValue?: string) => {
              selectActiveBoard(selectedValue);
            }}
          />
        </div>
        <div className="p-4 flex w-full h-full overflow-y">
          <div className="grid grid-flow-row grid-cols-5 h-fit w-full ">
            {activeBoard?.pins.map((data) => (
              <VibeCard
                key={data.id}
                data={data}
                activeVibe={isVibeActive(data)}
                setActiveVibe={setActivateVibe}
              />
            ))}
          </div>
        </div>
      </>
    </Modal>
  );
};

export default VibeModal;

const VibeCard = ({
  data,
  activeVibe,
  setActiveVibe,
}: {
  data: BoardData;
  activeVibe: boolean;
  setActiveVibe: (active: BoardData) => void;
}) => {
  return (
    <div className="w-full h-fit p-1">
      <button
        className={`${
          activeVibe ? " border-orange-600 border-2" : "border-none opacity-50"
        }  rounded-lg `}
        onClick={() => setActiveVibe(data)}
      >
        <img
          src={data.image_url}
          alt="vibe"
          className="block max-h-[40%] h-full w-auto rounded-lg object-fill object-center"
        />
      </button>
    </div>
  );
};
