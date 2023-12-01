import { Filter } from "./FilterTypes";
import { Item } from "./ItemTypes";

export enum EDemoTemplate {
  PUBLISHER,
  PRODUCT,
}

export enum EFiltersType {
  SINGLE_SELECT,
  MULTI_SELECT,
}

export type Configuration = DataConfiguration & {
  template: EDemoTemplate;
  branding: BrandingConfiguration;
};

export interface BrandingConfiguration {
  primary: string;
  secondary: string;
  tertiary: string;
  logo: string | JSX.Element;
}

export interface DataConfiguration {
  vantageSearchURL: string;
  accountId: string;
  collectionId: string;
  apiKey: string;
  defaultAccuracy: string;
  getItemsByIds: (ids: string[]) => Promise<Item[]>;
  getFilters: (search?: string) => Promise<Filter[]>;
  filtersType: EFiltersType;
  isFilterExpandable: boolean;
}
