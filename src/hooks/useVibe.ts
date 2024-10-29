import { BoardData, UseVibeType, VibeBoard } from "abstracts/VibeTypes";
import { useEffect, useState } from "react";

const useVibe = ({
  getBoards,
}: {
  getBoards?: () => Promise<VibeBoard[]>;
}): UseVibeType => {
  const [boards, setBoards] = useState<VibeBoard[]>([]);
  const [activeVibe, setActiveVibe] = useState<BoardData[]>([]);
  const [activeBoard, setActiveBoard] = useState<VibeBoard>();
  const [isVibeDirty, setIsVibeDirty] = useState(false);

  useEffect(() => {
    if (getBoards) {
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

  return {
    boards,
    activeBoard,
    changeActiveBoard,
    activeVibe,
    changeActiveVibe,
    isVibeDirty,
  };
};

export default useVibe;
