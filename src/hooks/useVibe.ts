import { BoardData, UseVibeType, VibeBoard } from "abstracts/VibeTypes";
import { useEffect, useState } from "react";

const useVibe = ({
  getBoards,
  vibeOverallWeightDefault,
}: {
  getBoards?: () => Promise<VibeBoard[]>;
  vibeOverallWeightDefault?: number;
}): UseVibeType => {
  const [boards, setBoards] = useState<VibeBoard[]>([]);
  const [activeVibe, setActiveVibe] = useState<BoardData[]>([]);
  const [vibeOverallWeight, setVibeOverallWeight] = useState(
    vibeOverallWeightDefault
  );
  const [activeBoard, setActiveBoard] = useState<VibeBoard>();
  const [isVibeDirty, setIsVibeDirty] = useState(false);

  useEffect(() => {
    if (getBoards) {
      setVibeOverallWeight(vibeOverallWeightDefault ?? 0.25);
      getBoards().then((boards) => {
        return setBoards(boards);
      });
    }
  }, []);

  useEffect(() => {
    !activeBoard && setActiveBoard(boards[0]);
  }, [boards]);

  const changeActiveBoard = (toggledData: VibeBoard) => {
    !isVibeDirty && setIsVibeDirty(true);
    setActiveBoard(toggledData);
  };

  const changeActiveVibe = (toggledData: BoardData[]) => {
    !isVibeDirty && setIsVibeDirty(true);
    setActiveVibe(toggledData);
  };

  const setSlideVibeOverallWeight = (value: number) => {
    setVibeOverallWeight(value);
  };
  return {
    boards,
    activeBoard,
    changeActiveBoard,
    activeVibe,
    changeActiveVibe,
    setSlideVibeOverallWeight,
    vibeOverallWeight,
    isVibeDirty,
  };
};

export default useVibe;
