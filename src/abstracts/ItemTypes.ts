export type Item = ItemMandatoryFields & {
  meta: OptionalMetaFields;
};

export type ItemMandatoryFields = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  embeddingText: string;
  score: number;
  externalUrl: string;
};

export type OptionalMetaFields = {
  subtitle: string;
  imageLabel: string;
};

export type ItemWithoutScore = Omit<Item, "score">;

// new
// export type ItemDTO = {
//   id: string;
//   title: string;
//   description: string;
//   url: string;
//   image_url: string;
//   text: string;
// } & object;

// old
export type ItemDTO = {
  id: string;
  noopMeta: {
    title: string;
    description: string;
    url: string;
    image_url: string;
    text: string;
  } & object;
};

export type CustomerDataHandler = {
  getItemsByIds: (results: string[]) => Promise<ItemWithoutScore[]>;
  transformData?: (results: unknown[]) => Item[];
};
