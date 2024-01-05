# react-quick-start

few examples of config.ts, just replace accountId,collectionId,apiKey and vantageSearchURL:

VANTAGE API TYPE:
```typescript
import { ECustomerAPIType } from "abstracts/CustomerApiTypes";
import {
  ClientConfiguration,
  EDemoTemplate,
} from "abstracts/DemoConfigurationTypes";
import { EFiltersType, Filter } from "abstracts/FilterTypes";
import { GetConfigurationWithDefaultValues } from "transformers/ConfigurationTransformer";

/**
 * Override this function to retrieve your filters from 3rd party, local folder or anywhere you like. Do not change the return type.
 *
 * @returns {Filter[]} The list of filters which are available in the UI.
 */
const getFilters = (): Promise<Filter[]> => {
  return Promise.resolve([{
    name: "PROSE",
    slug: "PROSE",
    categoryName: "book_format",
    categorySlug: "book_format",
  },
  {
    name: "GRAPHIC NOVEL",
    slug: "GRAPHIC_NOVEL",
    categoryName: "book_format",
    categorySlug: "book_format",
  },
  {
    name: "POETRY VERSE",
    slug: "POETRY_VERSE",
    categoryName: "book_format",
    categorySlug: "book_format",
  },
  {
    name: "SHORT STORY",
    slug: "SHORT_STORY",
    categoryName: "book_format",
    categorySlug: "book_format",
  },
  {
    name: "PICTURE BOOK",
    slug: "PICTURE_BOOK",
    categoryName: "book_format",
    categorySlug: "book_format",
  },
  {
    name: "YA BOOKS",
    slug: "YA_BOOKS",
    categoryName: "book_type",
    categorySlug: "book_type",
  },]);
};

const configuration: ClientConfiguration = {
  template: EDemoTemplate.PUBLISHER, // default product
  accountId: "Enter your Vantage Account ID.",
  collectionId: "Enter a list of Vantage Collection IDs to fetch data from.",
  apiKey: "Enter your Vantage API Key.",
  vantageSearchURL:
    "Enter an url to the Vantage API you want to fetch data from.", // default https://api.vanta.ge/v1/search
  customerAPI: {
    type: ECustomerAPIType.VANTAGE_API,
    apiKey: "",//key of api for path below
    apiPath: "https://demo-api.dev-a.dev.vantagediscovery.com/api/v1/items",
    customFieldTransformer: {
      imageSrc: {
        fieldName: "noopMeta.image_url",
      },
    },
    getFilters: getFilters,
  },
  filter: {
    type: EFiltersType.SINGLE_SELECT,
  },
  branding: {
    pageTitle: "Vantage",
  },
};

export default GetConfigurationWithDefaultValues(configuration);
```

CUSTOM API TYPE
```typescript
import { ECustomerAPIType } from "abstracts/CustomerApiTypes";
import {
  ClientConfiguration,
  EDemoTemplate,
} from "abstracts/DemoConfigurationTypes";
import { EFiltersType, Filter } from "abstracts/FilterTypes";
import { ItemWithoutScore } from "abstracts/ItemTypes";
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
const TransformItemDTOToView = (dto: any) => {
  return {
    id: dto.id,
    title: dto.noopMeta.title,
    imageSrc: dto.noopMeta.image_url,
    description: dto.noopMeta.description,
    embeddingText: dto.noopMeta.text ?? "",
    meta: {
      author: dto.noopMeta.autor,
    },
  };
};
const getItemsByIds = async (ids: string[]): Promise<ItemWithoutScore[]> => {
  return axios
    .get(`https://demo-api.dev-a.dev.vantagediscovery.com/api/v1/items`, {
      params: {
        ids,
        clientId: "Enter your client id",
        clientNamespace: "Enter your client namespace",
      },
    })
    .then((response: any) =>
      response.data
        .map((item: any) => TransformItemDTOToView(item))
        .filter(Boolean)
    );
};

const configuration: ClientConfiguration = {
  template: EDemoTemplate.PUBLISHER,
  accountId: "Enter your Vantage Account ID.",
  collectionId: "Enter a list of Vantage Collection IDs to fetch data from.",
  apiKey: "Enter your Vantage API Key.",
  vantageSearchURL:
    "Enter an url to the Vantage API you want to fetch data from.", // default https://api.vanta.ge/v1/search
  customerAPI: {
    type: ECustomerAPIType.CUSTOM_API,
    getCustomerItems: getItemsByIds,
    getFilters: getFilters,
  },
  filter: {
    type: EFiltersType.SINGLE_SELECT,
  },
  branding: {
    title: "Empower your search!",
    colors: {
      primary: "#F3E1C459",
      secondary: "#EC7F00",
    },
  },
};

export default GetConfigurationWithDefaultValues(configuration);

```

CDN API TYPE
```typescript

import { ECustomerAPIType } from "abstracts/CustomerApiTypes";
import {
  ClientConfiguration,
} from "abstracts/DemoConfigurationTypes";
import { EFiltersType, Filter } from "abstracts/FilterTypes";
import { GetConfigurationWithDefaultValues } from "transformers/ConfigurationTransformer";

const configuration: ClientConfiguration = {
  template: EDemoTemplate.PUBLISHER, // default product
  accountId: "Enter your Vantage Account ID.",
  collectionId: "Enter a list of Vantage Collection IDs to fetch data from.",
  apiKey: "Enter your Vantage API Key.",
  vantageSearchURL:
    "Enter an url to the Vantage API you want to fetch data from.", // default https://api.vanta.ge/v1/search
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
      "https://us.demo.com/eng-us/search/${query}",
  },
};

export default GetConfigurationWithDefaultValues(configuration); 
```
