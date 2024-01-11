import { Filter } from "./FilterTypes";
import { ItemDTO, ItemWithoutScore } from "./ItemTypes";

export enum ECustomerAPIType {
  VANTAGE_API = "ventage",
  CUSTOM_API = "custom",
  CDN_API = "cdn",
}

export type VantageAPIConfiguration = {
  type: ECustomerAPIType.VANTAGE_API | "ventage";
  apiKey: string;
  apiPath: string;
  accountPrefix: string; // by default taken from account
  collectionPrefix: string; // by default taken from collection
  getFilters: () => Promise<Filter[]>;
};

export type CustomAPIConfiguration = {
  type: ECustomerAPIType.CUSTOM_API | "custom";
  getFilters: () => Promise<Filter[]>;
  getCustomerItems: (ids: string[]) => Promise<ItemDTO[]>;
};
export type CDNAPIConfiguration = {
  type: ECustomerAPIType.CDN_API | "cdn";
  filterURL: string[];
  itemURLPattern: string;
  authHeader: string;
};

export type APIConfiguration =
  | CustomAPIConfiguration
  | VantageAPIConfiguration
  | CDNAPIConfiguration;

export type UseCustomerAPIType = {
  getItemsByIds: (id: string[]) => Promise<ItemWithoutScore[]>;
  getFilters: () => Promise<Filter[]>;
};

export type VantageAPIConfigurationClient = Partial<
  Omit<VantageAPIConfiguration, "customFieldTransformer">
> &
  // Mandatory fields
  Pick<VantageAPIConfiguration, "type" | "apiKey" | "apiPath">;

export type CDNAPIConfigurationClient = Partial<
  Omit<CDNAPIConfiguration, "customFieldTransformer">
> &
  // Mandatory fields
  Pick<CDNAPIConfiguration, "itemURLPattern" | "filterURL">;
