import { ClientConfiguration } from "abstracts/DemoConfigurationTypes";
import { Filter } from "abstracts/FilterTypes";
import { Item } from "abstracts/ItemTypes";
import { GetConfigurationWithDefaultValues } from "transformers/ConfigurationTransformer";

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
 * @returns {Item[]} The list of filters which are available in the UI.
 */
const getItemsByIds = (): Promise<Item[]> => {
  return Promise.resolve([]);
};

const configuration: ClientConfiguration = {
  accountId: "Enter your Vantage Account ID.",
  collectionIds: ["Enter a list of Vantage Collection IDs to fetch data from."],
  apiKey: "Enter your Vantage API Key.",
  vantageSearchURL:
    "Enter an url to the Vantage API you want to fetch data from.",
  getCustomerItems: getItemsByIds,
  filter: {
    getFilters: getFilters,
  },
};

export default GetConfigurationWithDefaultValues(configuration);
