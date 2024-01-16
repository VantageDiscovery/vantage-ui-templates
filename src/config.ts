import {
  ClientConfiguration,
  EDemoTemplate,
} from "./abstracts/DemoConfigurationTypes";
import { EFiltersType, Filter } from "./abstracts/FilterTypes";
import { ItemDTO } from "./abstracts/ItemTypes";
import axios from "axios";
import { GetConfigurationWithDefaultValues } from "./transformers/ConfigurationTransformer";
import { ECustomerAPIType } from "abstracts/CustomerApiTypes";

/**
 * Override this function to retrieve your filters from 3rd party, local folder or anywhere you like. Do not change the return type.
 *
 * @returns {Filter[]} The list of filters which are available in the UI.
 */
const getFilters = (): Promise<Filter[]> => {
  return Promise.resolve([]);
};

/**
 * Override this function to retrieve your items from 3rd party, local folder or anywhere you like. Do not change the return type.
 *
 * @param ids String array of item ids retrieved from Vantage database to get the actual Items.
 * @returns {Item[]} The list of items that will be transformed to match the UI.
 */
const getItemsByIds = async (ids: string[]): Promise<ItemDTO[]> => {
  return axios
    .get(`https://demo-api.dev-a.dev.vantagediscovery.com/api/v1/items`, {
      params: {
        ids,
        clientId: "smartcat",
        clientNamespace: "bookopolis-vukan",
      },
    })
    .then((response: any) => response.data);
};

const configuration: ClientConfiguration = {
  template: EDemoTemplate.PRODUCT,
  accountId: "smartcat",
  collectionId: ["bookopolis-vukan"],
  apiKey: "$2a$10$gEKEUssU5o1rpOcYOf/V..ruQZTEmiiNcV1ENkBQdgXQX8loQwXRe",
  vantageSearchURL: "https://api.dev-a.dev.vantagediscovery.com/v1/search",
  customerAPI: {
    type: ECustomerAPIType.CUSTOM_API,
    getCustomerItems: getItemsByIds,
    getFilters: getFilters,
  },
  defaultSearchQuery: "Wonderland",
  branding: {
    logoUrl: "bookopolis/icons/bookopolis.png",
    title: "Empower your search!",
    colors: {
      primary: "#F3E1C459",
      secondary: "#EC7F00",
    },
  },
  filter: {
    type: EFiltersType.MULTI_SELECT,
  },
};

export default GetConfigurationWithDefaultValues(configuration);
