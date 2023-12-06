import {
  Configuration,
  EDemoTemplate,
  EFiltersType,
} from "abstracts/DemoConfigurationTypes";

const defaultConfig: Configuration = {
  template: EDemoTemplate.PRODUCT, // It is either PRODUCT or PUBLISHER - it determines page layout.
  accountId: "Insert your Account ID",
  collectionId: "Insert your Collection ID",
  apiKey: "Insert your Vantage Customer API Key",
  defaultAccuracy: "0.5",
  defaultSearchQuery: "Insert value for initial search query",
  vantageSearchURL: "Insert an URL to the Vantage Search API",
  branding: {
    logoUrl: "Insert URL to the logo",
    title: "Insert page title",
    colors: {
      primary: "Hex value of primary color",
      secondary: "Hex value of secondary color",
    },
  },
  filter: {
    getFilters: () => Promise.resolve([]), // This function is getting all filters used within the demo.
    type: EFiltersType.SINGLE_SELECT, // Could be MULTI_SELECT if multiple filters can be selected at once.
  },
  getCustomerItems: (ids: string[]) => Promise.resolve([]), // A function that should get Item[] from your Item ids.
};

export default defaultConfig;
