import { VantageSearchResult } from "./VantageTypes";

export type ItemWithAny = ItemMandatoryFields & {
  meta: OptionalMetaFields & any;
};

export type Item = ItemWithAny & { [key: string]: any };

export type ItemMandatoryFields = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  embeddingText: string;
  score: number;
  externalUrl: string;
};

export type ItemWithoutScore = Omit<ItemWithAny, "score">;

export type OptionalMetaFields = {
  subtitle: string;
  imageLabel: string;
};
export type ItemDTO = {
  id: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  text: string;
} & object;

export type CustomerDataHandler = {
  getItemsByIds: (
    results: string[] | VantageSearchResult[]
  ) => Promise<ItemWithoutScore[]>;
  transformData?: (results: unknown[]) => Item[];
};
