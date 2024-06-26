import { Filter } from "./FilterTypes";
import { ItemDTO, ItemWithoutScore } from "./ItemTypes";
import { VantageSearchResult } from "./VantageTypes";

export enum ECustomerAPIType {
  VANTAGE_API = "vantage",
  CUSTOM_API = "custom",
  CDN_API = "cdn",
}

export type ECustomerString = "vantage" | "custom" | "cdn";

export type VantageAPIConfiguration = {
  type: ECustomerAPIType.VANTAGE_API;
  apiKey: string;
  apiPath: string;
  accountPrefix: string; // by default taken from account
  collectionPrefix: string; // by default taken from collection
  getFilters: () => Promise<Filter[]>;
};

export type CustomAPIConfiguration = {
  type: ECustomerAPIType.CUSTOM_API;
  getFilters: () => Promise<Filter[]>;
  getCustomerItems: (
    ids: string[] | VantageSearchResult[]
  ) => Promise<ItemDTO[]>;
};
export type CDNAPIConfiguration = {
  type: ECustomerAPIType.CDN_API;
  filterURL: string[];
  itemURLPattern: string;
  authHeader: string;
};

export type APIConfiguration =
  | CustomAPIConfiguration
  | VantageAPIConfiguration
  | CDNAPIConfiguration;

export type UseCustomerAPIType = {
  getItemsByIds: (
    id: string[] | VantageSearchResult[]
  ) => Promise<ItemWithoutScore[]>;
  getFilters: () => Promise<Filter[]>;
};

export type VantageAPIConfigurationClient = Partial<
  Omit<VantageAPIConfiguration, "type">
> &
  // Mandatory fields
  Pick<VantageAPIConfiguration, "apiKey" | "apiPath"> & {
    type: "vantage" | ECustomerAPIType.VANTAGE_API;
  };

export type CustomerAPIConfigurationClient = Partial<
  Omit<CustomAPIConfiguration, "type">
> &
  // Mandatory fields
  Pick<CustomAPIConfiguration, "getCustomerItems" | "getFilters"> & {
    type: ECustomerAPIType.CUSTOM_API | "custom";
  };

export type CDNAPIConfigurationClient = Partial<
  Omit<CDNAPIConfiguration, "type">
> &
  // Mandatory fields
  Pick<CDNAPIConfiguration, "itemURLPattern" | "filterURL"> & {
    type: "cdn" | ECustomerAPIType.CDN_API;
  };
