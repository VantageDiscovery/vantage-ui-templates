export interface Item {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  embeddingText: string;
  score: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any;
}

export type CustomerDataHandler = {
  getItemsByIds: (results: string[]) => Promise<Omit<Item, "score">[]>;
  transformData?: (results: unknown[]) => Item[];
};
