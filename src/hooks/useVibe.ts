import { BoardData, UseVibeType, VibeBoard } from "abstracts/VibeTypes";
import { useEffect, useState } from "react";

const useVibe = ({
  getBoards,
}: {
  getBoards?: () => Promise<VibeBoard[]>;
}): UseVibeType => {
  const [boards, setBoards] = useState<VibeBoard[]>([]);
  const [activeVibe, setActiveVibe] = useState<BoardData[]>([]);

  useEffect(() => {
    getBoards &&
      getBoards().then((boards) => {
        return setBoards(boards);
      });
  }, []);

  const changeActiveVibe = (toggledData: BoardData[]) => {
    setActiveVibe(toggledData);
  };

  return {
    boards,
    activeVibe,
    changeActiveVibe,
  };
};

export default useVibe;
