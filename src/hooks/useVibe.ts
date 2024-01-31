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

  useEffect(() => {
    if (getBoards) {
      setVibeOverallWeight(vibeOverallWeightDefault ?? 0.25);
      getBoards().then((boards) => {
        return setBoards(boards);
      });
    }
  }, []);

  const changeActiveVibe = (toggledData: BoardData[]) => {
    setActiveVibe(toggledData);
  };

  const setSlideVibeOverallWeight = (value: number) => {
    setVibeOverallWeight(value);
  };
  return {
    boards,
    activeVibe,
    changeActiveVibe,
    setSlideVibeOverallWeight,
    slideVibeOverallWeight: vibeOverallWeight,
  };
};

export default useVibe;
