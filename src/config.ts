import { ClientConfiguration } from "./abstracts/DemoConfigurationTypes";
import { Filter } from "./abstracts/FilterTypes";
import { ItemDTO } from "./abstracts/ItemTypes";
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getItemsByIds = async (ids: string[]): Promise<ItemDTO[]> => {
  return [];
};

const configuration: ClientConfiguration = {
  accountId: "Enter your Vantage Account ID.",
  collectionId: "Enter a list of Vantage Collection IDs to fetch data from.",
  apiKey: "Enter your Vantage API Key.",
  vantageSearchURL:
    "Enter an url to the Vantage API you want to fetch data from.",
  customerAPI: {
    type: ECustomerAPIType.CUSTOM_API,
    getCustomerItems: getItemsByIds,
    getFilters: getFilters,
  },
};

export default GetConfigurationWithDefaultValues(configuration);
