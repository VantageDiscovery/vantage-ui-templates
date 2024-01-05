import { Filter } from "./FilterTypes";
import { ItemWithoutScore, OptionalMetaFields } from "./ItemTypes";

export enum ECustomerAPIType {
  VANTAGE_API,
  CUSTOM_API,
  CDN_API,
}

export type CustomFieldSpecification = {
  fieldName: string;
  transformer?: (element: string) => string;
};

export type CustomFieldTransformer = Partial<
  Record<
    keyof Omit<ItemWithoutScore, "meta"> | keyof OptionalMetaFields,
    CustomFieldSpecification
  >
>;

type CustomFieldTransformerClient = Partial<
  Record<
    keyof Omit<ItemWithoutScore, "meta"> | keyof OptionalMetaFields,
    string | CustomFieldSpecification
  >
>;

export type VantageAPIConfiguration = {
  type: ECustomerAPIType.VANTAGE_API;
  apiKey: string;
  apiPath: string;
  customFieldTransformer: CustomFieldTransformer;
  accountPrefix: string; // by default taken from account
  collectionPrefix: string; // by default taken from collection
  getFilters: () => Promise<Filter[]>;
};

export type CustomAPIConfiguration = {
  type: ECustomerAPIType.CUSTOM_API;
  getFilters: () => Promise<Filter[]>;
  getCustomerItems: (ids: string[]) => Promise<ItemWithoutScore[]>;
};
export type CDNAPIConfiguration = {
  type: ECustomerAPIType.CDN_API;
  filterURL: string[];
  itemURLPattern: string;
  customFieldTransformer: CustomFieldTransformer;
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
  Pick<VantageAPIConfiguration, "type" | "apiKey" | "apiPath"> & {
    customFieldTransformer?: CustomFieldTransformerClient;
  };

export type CDNAPIConfigurationClient = Partial<
  Omit<CDNAPIConfiguration, "customFieldTransformer">
> &
  // Mandatory fields
  Pick<CDNAPIConfiguration, "itemURLPattern" | "filterURL"> & {
    customFieldTransformer?: CustomFieldTransformerClient;
  };
