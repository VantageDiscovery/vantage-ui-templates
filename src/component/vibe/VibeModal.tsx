import { BoardData, UseVibeType, VibeBoard } from "abstracts/VibeTypes";
import Modal from "component/layout/Modal";
import React, { useEffect, useState } from "react";
import { Masonry } from "masonic";
import PintrestLogo from "icons/PintrestLogo";
import VibeChip from "./VibeChip";
import PintrestForm from "./PintrestForm";
import sessionStorageService from "services/SessionStorageService";
import ResetIcon from "icons/ResetIcon";
import LottieImage from "animation/LottieImage";
import VibeCard from "./VibeCard";

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
          <Masonry
            itemKey={(data) => data.props.id}
            items={activeBoard?.pins.map((data) => {
              return {
                props: data,
                activeVibe: isVibeActive(data),
                setActiveVibe: setActivateVibe,
              };
            })}
            render={VibeCard}
          />
        </div>
      </>
    );
  };

  return (
    <Modal
      isVisible={isModalVisible}
      className={`flex flex-col  ${
        username ? "w-3/5 h-5/6" : "w-1/5 h-1/2"
      } relative bg-white rounded-lg py-6 gap-5`}
      onCloseModal={toggleModal}
    >
      {username ? (
        <>
          <header className="flex w-full px-6 justify-center items-center">
            <div className="w-1/5">
              <PintrestLogo />
            </div>
            <span className="flex justify-center w-full">
              <h1 className="text-2xl">
                Choose your Vibe, Influence your results!
              </h1>
            </span>
            <div className="flex">
              <button
                className={`${
                  !showAnimation && "hover:bg-[#EFEFEF]"
                } mr-5 rounded-3xl`}
                onClick={() => setCurrentVibe([])}
                disabled={showAnimation}
              >
                <ResetIcon />
              </button>
              <button
                onClick={() => {
                  onModalClose();
                }}
                className="flex rounded-4xl w-36 h-12 text-white text-base bg-[#E60023] justify-center items-center"
                disabled={showAnimation}
              >
                Set Vibe
              </button>
            </div>
          </header>
          {bodySection()}
        </>
      ) : (
        <PintrestForm
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
