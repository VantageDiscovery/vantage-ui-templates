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
  template: "product",
  accountId: "smartcat",
  collectionId: ["bookopolis-vukan"],
  apiKey: "$2a$10$gEKEUssU5o1rpOcYOf/V..ruQZTEmiiNcV1ENkBQdgXQX8loQwXRe",
  vantageSearchURL: "https://api.dev-a.dev.vantagediscovery.com/v1/search",
  customerAPI: {
    type: "custom",
    getCustomerItems: getItemsByIds,
    getFilters: getFilters,
  },
  customFieldTransformer: {
    imageSrc: {
      fieldName: "noopMeta.image_url",
    },
    description: { fieldName: "noop_description" },
    title: { fieldName: "noop_title" },
    externalUrl: { fieldName: "noop_url" },
  },
};

export default GetConfigurationWithDefaultValues(configuration);
