export type VibeBoard = {
  id?: string;
  name: string;
  pins: BoardData[];
  image_url?: string;
  parent_board?: VibeBoard;
};

export type BoardData = {
  id: string;
  image_url?: string;
  text?: string;
  embedding?: number[];
  image_base64?: string;
};

export type UseVibeType = {
  boards: VibeBoard[];
  activeBoard?: VibeBoard;
  changeActiveBoard: (toggledData: VibeBoard) => void;
  activeVibe: BoardData[];
  changeActiveVibe: (toggledData: BoardData[]) => void;
  vibeOverallWeight?: number;
  setSlideVibeOverallWeight: (value: number) => void;
  isVibeDirty: boolean;
};
