import {
  Configuration,
  EDemoTemplate,
  EFiltersType,
} from "abstracts/DemoConfigurationTypes";

export const config: Configuration = {
  template: EDemoTemplate.PRODUCT,
  accountId: "",
  collectionId: "",
  apiKey: "",
  branding: {
    logo: "",
    primary: "",
    secondary: "",
    tertiary: "",
  },
  defaultAccuracy: "0.5",
  getFilters: () => Promise.resolve([]),
  getItemsByIds: (ids: string[]) => Promise.resolve([]),
  vantageSearchURL: "",
  filtersType: EFiltersType.MULTI_SELECT,
  isFilterExpandable: true, // determines if we have modal with all filters or only dropdow/side navbar, when true then modal
};
