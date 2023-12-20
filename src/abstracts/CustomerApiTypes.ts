import { ItemWithoutScore, OptionalMetaFields } from "./ItemTypes";

export enum ECustomerAPIType {
  VANTAGE_API,
  CUSTOM_API,
}

export type CustomFieldTransformer = Partial<
  Record<keyof OptionalMetaFields, string>
>;

export type VantageAPIConfiguration = {
  type: ECustomerAPIType.VANTAGE_API;
  apiKey: string;
  apiPath: string;
  customFieldTransformer?: CustomFieldTransformer;
  accountPrefix?: string; // by default taken from account
  collectionPrefix?: string; // by default taken from collection
};

export type CustomAPIConfiguration = {
  type: ECustomerAPIType.CUSTOM_API;
  getCustomerItems: (ids: string[]) => Promise<ItemWithoutScore[]>;
};

export type APIConfiguration = CustomAPIConfiguration | VantageAPIConfiguration;

export type UseCustomerAPIType = {
  getItemsByIds: (id: string[]) => Promise<ItemWithoutScore[]>;
};
