import { VibeBoard } from "abstracts";
import {
  ClientConfiguration,
  EDemoTemplate,
} from "./abstracts/DemoConfigurationTypes";
import { EFiltersType, Filter } from "./abstracts/FilterTypes";
import { GetConfigurationWithDefaultValues } from "./transformers/ConfigurationTransformer";
import { ECustomerAPIType } from "abstracts/CustomerApiTypes";

/**
 * Override this function to retrieve your filters from 3rd party, local folder or anywhere you like. Do not change the return type.
 *
 * @returns {Filter[]} The list of filters which are available in the UI.
 */
import categories2Filter from "./meta_category2.json";
import categories3Filter from "./meta_category3.json";
const getFilters = (): Promise<Filter[]> => {
  return Promise.resolve([
    // ...metaColorsFilter,
    // ...metaSizeFilter,
    ...categories2Filter,
    ...categories3Filter.sort((a, b) => {
      if (a.categoryName.toLowerCase() > b.categoryName.toLowerCase()) return 1;
      if (a.categoryName.toLowerCase() < b.categoryName.toLowerCase())
        return -1;
      return 0;
    }),
  ]);
};

/**
 * Override this function to retrieve your items from 3rd party, local folder or anywhere you like. Do not change the return type.
 *
 * @param ids String array of item ids retrieved from Vantage database to get the actual Items.
 * @returns {Item[]} The list of items that will be transformed to match the UI.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getItemsByIds = async (
//   ids: string[] | VantageSearchResult[]
// ): Promise<ItemDTO[]> => {
//   return [];
// };

import pinsData from "./pins-data.json";

const getBoards = async (): Promise<VibeBoard[]> => {
  return pinsData.boards;
};

const configuration: ClientConfiguration = {
  template: EDemoTemplate.PRODUCT, // default product
  accountId: "fbliss",
  defaultAccuracy: "1.0",
  experimental: {
    cache: true,
    fields: [
      "image_url",
      "description",
      "title",
      "url",
      "images",
      "category2",
      "category3",
      "variants_size",
      "variants_colors",
      "brand",
      "ordered_price",
      "rating_value",
      "ordered_review_count",
    ],
  },
  fieldValueWeighting: {
    queryKeyWordWeightingMode: "none",
    queryKeyWordMaxOverallWeight: 1,
    keyWordWeightingQuery: {
      url: "https://r44.dev.vantagediscovery.com/process_query",
      account_id: "lance-riedel",
      field_name: "ngrams",
      timeout: 500,
    },
  },
  defaultSearchQuery: "blue kicks",
  enableMoreLikeThese: true,
  // @Tom change this for your collection id inside fbliss account in demo-b
  collectionId: "ff4u-mt-asos-ssense-patched-1536",
  apiKey:
    "f81b1c338da8df421dc907d5a7cd9fba3fcd8995d3b2512be0b3e28503a68a509dd7bae4881370252656ef4949b9ac23ddd92574caf158b6fcf86942dcd658b9e32683cba81efef715c61394c89a949ee829d1b32128026cde1ad2101a2f49b23e80d8b4af84a85cb4aeae89bbe3dac25a9b1c36afd166dff65ea736920cee5a634d57887233f20082c0357514110f2b43d66b71a0951d85b70e1986",
  vantageSearchURL: "https://demo-api.demo-b.vantagediscovery.com/v1/search",
  customerAPI: {
    type: ECustomerAPIType.VANTAGE_API,
    apiKey: "9dbc429f-d258-4357-aa61-95b4d9e2b973", //key of api for path below
    apiPath: "https://demo-api.demo-b.vantagediscovery.com/api/v1/items",
    collectionPrefix: "ff4u-mt-asos-ssense-patched-1536-2",
    accountPrefix: "nick-nov9",
    getFilters: getFilters,
  },
  // pageSize: 30,
  filter: {
    type: EFiltersType.SINGLE_SELECT,
  },
  vibe: {
    getBoards: getBoards,
    vibeOverallWeight: 0.5,
  },

  customFieldTransformer: {
    imageSrc: {
      fieldName: "noopMeta.image_url",
    },
    description: { fieldName: "noopMeta.description" },
    title: { fieldName: "noopMeta.title" },
    embeddingText: { fieldName: "noopMeta.text" },
    externalUrl: { fieldName: "noopMeta.url" },
  },
  salesForce: {
    salesForceUrl:
      "https://demo-api.demo-b.vantagediscovery.com/api/v1/sf/leads",
    key: "9dbc429f-d258-4357-aa61-95b4d9e2b973",
  },
  branding: {
    pageTitle: "ASOS Mens Clothing",
    searchPlaceholder: "Search...",
    // logoUrl: new URL("asos-mens-fashion/asos-mens-fashion.png", import.meta.url)
    //   .href,
  },
};
export default GetConfigurationWithDefaultValues(configuration);
