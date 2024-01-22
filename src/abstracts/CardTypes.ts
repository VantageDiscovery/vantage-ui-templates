import { Item } from "./ItemTypes";

export type ProductCardProperties = Item & {
  primaryColor: string;
  secondaryColor: string;
  onMoreLikeThisClicked: () => void;
  infoContent: string;
  redirectUrl?: string;
  subtitle?: string;
  // bottomLeftLabel?: number;
  bottomRightLabel?: string;
  isDeveloperView?: boolean;
  searchAccuracy?: number;
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
