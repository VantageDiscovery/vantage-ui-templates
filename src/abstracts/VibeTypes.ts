export type VibeBoard = {
  name: string;
  pins: BoardData[];
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
  activeVibe: BoardData[];
  changeActiveVibe: (toggledData: BoardData[]) => void;
  vibeOverallWeight?: number;
  setSlideVibeOverallWeight: (value: number) => void;
};
