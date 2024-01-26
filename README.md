# Vantage demo template

Library for easy demo creation.


#### <span style="vertical-align: middle">:floppy_disk:</span> _Install:_
```typescript
npm install vantage-demo-template
```

#### 🔨 Configuration 
```typescript
{
  // type of template , string and enum types are same 
  // default "product"
  template?:"product" | "publisher" | EDemoTemplate.PRODUCT | EDemoTemplate.PUBLSIHER,

  // "Enter your Vantage Account ID.",
  accountId:string,


  // "Enter a list of Vantage Collection IDs to fetch data from."
  // Can be overriden by url param
  collectionId:string,


  // "Enter your Vantage API Key."
  apiKey:string,


  // "Enter an url to the Vantage API you want to fetch data from.",
  // default https://api.vanta.ge/v1/search
  vantageSearchURL:string,

  //customer api configuration  
  customerAPI:

    //vantage customer api type configuration
    {

    type: "vantage" | ECustomerAPIType.VANTAGE,

    //key of api for path below
    apiKey: string,


    // Ex. "https://demo-api.dev-a.dev.vantagediscovery.com/api/v1/items",
    apiPath:string,

    
    // function for getting filters
    // default () => Promise.resolve([]),
    getFilter:() => Filter[],

    
    // "if account id is not same for getItems",
    accountPrefix?:string,


    //"if collection id is not same for getItems" 
    collectionPrefix?:string,

    }

    // or
  
    // custom customer api type configuration
    {

    type: "custom" | ECustomerAPIType.CUSTOM_API,

    // function for getting items
    getCustomerItems:() => itemDTO[],

    // function for getting filters
    // default () => Promise.resolve([]),
    getFilter:() => Filter[]

    } 

     // or

    // cdn customer api type cofiguration
    {

    type:"cdn" |  ECustomerAPIType.CDN_API,

    // "URLs from where to get filters",
    filterURL:string[],

    
    // "url pattern for getting items by id"
    // https://something/${id} , ${id} will be replaced with id of item  
    itemURLPattern:string,

    
    // "something to add to header of request",
    authHeader?:string,

    },

  // if some field from get items need aditional transform
  customFieldTransformer?: ({

    // fields that can be transformed id, description, imageSrc, title, embeddingText, externalUrl , meta: imageLabel, subtitle
    id?: {

        // field name exp:"something.id"
        fieldName?: string;

        // function how to transform field
        transformer?: {} ;
    };
    ... 7 more ...;
  )},


  // "accuracy of search 0-1"
  // Can be overriden by url param
  // default 0.5
  defaultAccuracy?: string,


  // "What you want to be inital search"
  // deafault "Type in anything you want and explore magic..."
  defaultSearchQuery?:string,


  // "original search results"
  // note need to have ${query} that will be replaced with real query
  originalSearchResultsURL?:string,


  // number of page of results
  // default 0
  pageNumber?:number,


  // number of results per page
  // default 20 
  pageSize?:number,


  // branding specific configuration
  branding?:{

    // colors of brend
    colors?:{
      
      // "primary color of brend"
      // default "#BFC9CA"
      primary?:string,

      // "secondary color of brend"
      // default "#F8C471"
      secondary?:string,
    },

    
    // "url to logo img of brend"
    // default "https://img.logoipsum.com/327.svg",
    logoUrl?:string,


    // "title of tab"
    // defaut "vite app"
    pageTitle?:string,


    // "placeholder for search", 
    searchPlaceholder?:string,

    // "title on page"
    // default "Empower your search!"
    title?:string
  },

  // filter specific configuration 
  filter?:{

    // type of filters
    // default EFilterType.SINGLE_SELECT
    type?: EFiltersType.SINGLE_SELECT | EFiltersType.MULTI_SELECT;

    // some  popular filters
    getPopularFilters?: {},
  },

  // shingling specific configuration
  shingling?:{

    // number 0-1
    // default 0
    // Can be overriden by url param
    documentMatchScoreWeight?:number,

    // number 0-1
    // default 0
    // Can be overriden by url param
    queryMatchScoreWeight?: number 

    // number 0-1
    // default 1
    // Can be overriden by url param
    cosineSimilarityScoreWeight?: number 
  }

```
## 🚀 START USING IT

#### Generate template with just configuration 

```typesrcipt

import React from "react";
import configuraton from "./configuration";
import { generateTempleteWithConfig } from "vantage-demo-template";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={generateTempleteWithConfig(configuration)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```
#### VantageWrapper

Mandatory wrapper for using vantage hooks and queries
```typesrcipt

import React from "react";
import configuraton from "./configuration";
import {  VantageWrapper } from "vantage-demo-template";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <VantageWrapper configuration={configuration} > Your template here </VantageWrapper> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
### 🪝 Hooks

#### useDemoHook

```typescript
import {useDemoHook} from "vantage-demo-template"

 const {
    /*
    Avalable action with Filters

    Get all available filters
    -availableFilters: Filter[];

    Get active filters
    -activeFilters: Filter[];

    Get popular filters
    -popularFilters: Filter[];

    Set active filters
    -setActiveFilters: (filters: Filter[]) => void;

    Toggle filters
    -toggleFilters: (filters: Filter[]) => void;

    Get filters string
    -getFilterString: () => string;

    Clear all active filters
    -clearActiveFilters: () => void;
    */
    filterActions,

    /* Get search results
    -collectionId: string;
    -items: Item[];
    -executionTime: number;
    -isLoading: boolean;
    -isSuccess: boolean;
    -isError: boolean; */
    searchResults,

    /*
    Variables

    query: string;
    isDeveloperViewToggled: boolean;
    moreLikeDocumentId: string;
    */
    variables,

    /*
    Avalable actions 
    
    performSearch: () => void;
    performMoreLikeThis: (id: string) => void;
    setQuery: Dispatch<React.SetStateAction<string>>;
    setIsDeveloperViewToggled: Dispatch<React.SetStateAction<boolean>>;
    */
    demoActions,

    /*
    Get data configuration part from configuration
    */
    dataConfiguration,
  } = useDemoHook();

```

#### useCustomerAPIHook

Hook binding getItemsByIds, getFilters for specific CustomerApi type

```typescript
import {useCustomerAPIHook} from "vantage-demo-template"

 const {
    /*
    Get data configuration back with binded  getItemsByIds, getFilters function specific to CustomerApi type forwarded in configuration
    */
    dataConfiguration,
  } = useCustomerAPIHook(dataConfiguration);

```


#### useUrlParamsHook

Hook for override accuracy, customerId, cosine_similarity_score_weight, query_match_score_weight, document_match_score_weight values and saving state of search

```typescript
import {useUrlParamsHook} from "vantage-demo-template"

 const {
    /*
    Get data configuration back with overriden values
    */
    dataConfiguration,
    /*
    Get search from url
    */
    search,
    /*
    Get document id from 
    */
    documentId,
  } = useUrlParamsHook(dataConfiguration,
  search,
  documentId);

```


#### useFilterHook

Hook gives back filter actions

```typescript
import {useFilterHook} from "vantage-demo-template"

 const {
     /*
      Avalable action with Filters
      Get all available filters
    */
    availableFilters: Filter[];

    /*
      Get active filters
    */
    activeFilters: Filter[];

     /*
     Get popular filters
    */
    popularFilters: Filter[];

    /*
      Set active filters
    */
    setActiveFilters: (filters: Filter[]) => void;

    /*
      Toggle filters
    */
    toggleFilters: (filters: Filter[]) => void;

    /*
     Get filters string
    */
    getFilterString: () => string;

    /*
      Clear all active filters
    */
    clearActiveFilters: () => void;
  } = useFilterHook( {filterType, getAvailableFilters, getPopularFilters });

```

#### useToggleHook

Hook for toggle buttons

```typescript
import {useToggleHook} from "vantage-demo-template"

 const {
     [boolean, () => void]
  } = useToggleHook();

```

## 🔍 VantageSearchQueries

```typescript
import {VantageSearchQueries} from "vantage-demo-template"


  /**
   * Performs Vantage Search then it performs getItemsByIds from customerDataHandler.
   *
   * @param searchConfiguration Search configuration that is customer only related.
   * @param searchParameters A parameters send to Broker to retrieve results.
   * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
   * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
   */
  const searchResults = VantageSearchQueries.useSearchByConfiguration(vantageSearchURL, searchConfigurations, searchParameters, customerDataHandler)

  /**
   * Performs Vantage More Like This and then it performs getItemsByIds from customerDataHandler.
   *
   * @param searchConfiguration Search configuration that is customer only related.
   * @param searchParameters A parameters send to Broker to retrieve results.
   * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
   * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
   */
  const searchResults = VantageSearchQueries.useMoreLikeThisByConfiguration(vantageSearchURL, searchConfigurations, searchParameters, customerDataHandler),
}

```



## 📓 Examples
#### Examples of configurations, just replace accountId,collectionId,apiKey and vantageSearchURL:

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
