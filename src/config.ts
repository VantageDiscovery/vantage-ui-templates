import { ECustomerAPIType } from "abstracts/CustomerApiTypes";
import {
  ClientConfiguration,
  EDemoTemplate,
} from "abstracts/DemoConfigurationTypes";
import { EFiltersType, Filter } from "abstracts/FilterTypes";
import { Item } from "abstracts/ItemTypes";
import axios from "axios";
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
 * @param ids String array of item ids retrieved from Vantage database to get the actual Items.
 * @returns {Item[]} The list of items that will be transformed to match the UI.
 */
const getItemsByIds = async (ids: string[]) => {
  [];
};

const configuration: ClientConfiguration = {
  accountId: "Enter your Vantage Account ID.",
  collectionId: "Enter a list of Vantage Collection IDs to fetch data from.",
  apiKey: "Enter your Vantage API Key.",
  vantageSearchURL:
    "Enter an url to the Vantage API you want to fetch data from.",
  customerAPI: {
    type: ECustomerAPIType.CDN_API,
    itemURLPattern: "https://furniture-json.netlify.app/${id}.json",
    filterURL: [
      "https://657cc9321ade9138c146e61c--furniture-json.netlify.app/meta_category.json",
      "https://657cc9321ade9138c146e61c--furniture-json.netlify.app/meta_numratings_bucket.json",
      "https://657cc9321ade9138c146e61c--furniture-json.netlify.app/meta_rating_bucket.json",
    ],
    customFieldTransformer: {
      imageSrc: {
        fieldName: "noop_image_url",
      },
      description: { fieldName: "noop_description" },
      title: { fieldName: "noop_title" },
      externalUrl: { fieldName: "noop_url" },
    },
  },
  filter: {
    type: EFiltersType.MULTI_SELECT,
  },
  branding: {
    originalSearchResultsURL:
      "https://us.louisvuitton.com/eng-us/search/${query}",
  },
};

export default GetConfigurationWithDefaultValues(configuration);
