import { Item } from "./ItemTypes";

export type SelectedMoreLikeTheseCard = {
  item: Item;
  primaryColor?: string;
  secondaryColor?: string;
  infoContent?: string;
  liked?: boolean;
  onMoreLikeThisClicked?: () => void;
  moreLikeTheseActions?: useMoreLikeTheseType;
  isDeveloperView?: boolean;
};

export type useMoreLikeTheseType = {
  activeMLThese: SelectedMoreLikeTheseCard[];
  isActive: boolean;
  toggleActivate: () => void;
  setActiveMLThese: (items: SelectedMoreLikeTheseCard[]) => void;
  neutralMLTItem: (id: string) => void;
  isAlreadySelected: (id: string, liked: boolean) => boolean;
  changedLiked: (item: SelectedMoreLikeTheseCard) => void;
};
