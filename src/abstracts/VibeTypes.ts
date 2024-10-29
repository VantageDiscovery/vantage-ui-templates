export type VibeBoard = {
  name: string;
  pins: BoardData[];
  image_url?: string;
  parent_board?: VibeBoard;
  id?: string;
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
  isVibeDirty: boolean;
  activeBoard?: VibeBoard;
  id?: string;
  brokerServiceUrl?: string;
  accountId?: string;
  collectionId?: string;
  apiKey?: string;

  changeActiveBoard: (toggledData: VibeBoard) => void;
  changeActiveVibe: (toggledData: BoardData[]) => void;
};
