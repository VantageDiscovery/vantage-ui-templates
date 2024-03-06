import { Item } from "./ItemTypes";
import { useMoreLikeTheseType } from "./useMoreLikeTheseType";

export type ProductCardProperties = {
  item: Item;
  primaryColor: string;
  secondaryColor: string;
  onMoreLikeThisClicked: () => void;
  infoContent: string;
  subtitle?: string;
  moreLikeTheseActions?: useMoreLikeTheseType;
  bottomRightLabel?: string;
  isDeveloperView?: boolean;
  searchAccuracy?: number;
  staticHeight?: boolean;
};

export type CardProperties = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  redirectUrl: string;
  tooltipContent: string;
  accuracy: number;
};

export type PublishCardProperties = {
  cardProperties: CardProperties;
  isDeveloperView: boolean;
  onMoreLikeThis?: (documentId: string) => void;
  primaryColor: string;
  secondaryColor: string;
};
