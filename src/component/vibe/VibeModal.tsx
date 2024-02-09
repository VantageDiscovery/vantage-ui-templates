import { BoardData, UseVibeType, VibeBoard } from "abstracts/VibeTypes";
import Modal from "component/layout/Modal";
import React, { useEffect, useState } from "react";
import PinterestLogo from "icons/PinterestLogo";
import VibeChip from "./VibeChip";
import PinterestForm from "./PinterestForm";
import sessionStorageService from "services/SessionStorageService";
import ResetIcon from "icons/ResetIcon";
import LottieImage from "animation/LottieImage";
import VibeCard from "./VibeCard";
import Masonry from "react-layout-masonry";
import cn from "utils/cn";

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
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentVibe, setCurrentVibe] = useState<BoardData[]>(
    activeBoard?.pins
  );

  const [username, setUsername] = useState(
    sessionStorageService.getSessionUsername()
  );

  useEffect(() => {
    setActiveBoard(boards[0]);
  }, [boards]);

  useEffect(() => {
    setCurrentVibe(activeBoard?.pins);
  }, [activeBoard]);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 5000);
    return () => clearTimeout(timer);
  }, [showAnimation]);

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

  const selectActiveBoard = (board: VibeBoard) => {
    setActiveBoard(board);
  };

  const isBoardSelected = (board: VibeBoard) => {
    return activeBoard === board;
  };

  const clearCurrentVibe = () => {
    setCurrentVibe([]);
  };

  const bodySection = (): React.JSX.Element => {
    return showAnimation ? (
      <div className="w-full h-full items-center flex">
        <LottieImage />
      </div>
    ) : (
      <>
        <div className="flex px-5 w-full h-24 items-center overflow-x-scroll scrollbar-small">
          {boards?.map((board) => (
            <VibeChip
              title={board.name}
              key={board.name}
              isSelected={isBoardSelected(board)}
              onClick={() => {
                selectActiveBoard(board);
              }}
              imgSrc={board.pins[0].image_url}
            />
          ))}
        </div>

        <div className="flex flex-wrap px-5 h-full w-full overflow-y-scroll scrollbar-small">
          <Masonry gap={16} columns={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }}>
            {activeBoard.pins.map((data) => {
              return (
                <VibeCard
                  key={data.id}
                  data={data}
                  activeVibe={isVibeActive(data)}
                  setActiveVibe={setActivateVibe}
                />
              );
            })}
          </Masonry>
        </div>
      </>
    );
  };

  return (
    <Modal
      isVisible={isModalVisible}
      className={cn(
        "flex flex-col relative bg-white py-6 gap-5",
        username ? "w-3/5 h-5/6 rounded-lg" : "w-1/5 h-1/2 rounded-3xl"
      )}
      onCloseModal={toggleModal}
    >
      {username ? (
        <>
          <header className="flex w-full px-6 justify-center items-center">
            <div className="w-1/5 min-w-[100px]">
              <PinterestLogo />
            </div>
            <span className="flex justify-center w-full">
              <h1 className="text-sm md:text-lg lg:text-xl xl:text-2xl">
                Choose your Vibe, Influence your results!
              </h1>
            </span>
            <div className="flex">
              <button
                className={cn("mr-5 rounded-3xl", {
                  "hover::bg-[#EFEFEF]": !showAnimation,
                })}
                onClick={clearCurrentVibe}
                disabled={showAnimation}
              >
                <ResetIcon />
              </button>
              <button
                onClick={onModalClose}
                className="flex rounded-4xl w-36 h-12 text-white text-base bg-pinterest-primary justify-center items-center"
                disabled={showAnimation}
              >
                Set Vibe
              </button>
            </div>
          </header>
          {bodySection()}
        </>
      ) : (
        <PinterestForm
          setUsername={(value: string) => {
            sessionStorageService.setSessionUsername(value);
            setUsername(value);
            setShowAnimation(true);
          }}
        />
      )}
    </Modal>
  );
};
export default VibeModal;
