# Vantage demo template

Library for easy demo creation.


#### <span style="vertical-align: middle">:floppy_disk:</span> _Install:_
```typescript
npm install vantage-demo-template
```

#### 🔨 Configuration 
```typescript
{
  // Type of template
  // default: "product"
  template?: "product" | "publisher" ,

  // Enter your Vantage account id
  // Find at https://console.dev-a.dev.vantagediscovery.com/ in the up right corner under name is your account id  
  accountId: string,


  // Enter a list of Vantage Collection IDs to fetch data from
  // Find at visit : https://console.dev-a.dev.vantagediscovery.com/collections
  collectionId: string | string[],


  // Enter your Vantage API Key.
  // Find at https://console.dev-a.dev.vantagediscovery.com/api
  apiKey: string,


  // Enter an url to the Vantage API you want to fetch data from
  // default: https://api.vanta.ge/v1/search
  vantageSearchURL: string,

  // Customer api configuration
  // The API where your data details are exposed (Vantage Search returns ID and Score only)
  // Avalable types are: "vantage" , "cdn" or "custom"
  customerAPI:

    // Vantage customer api type configuration
    // Special case when you shared your data with us and we stored it on our Demo API's
    {

    type: "vantage",

    // Key of api where items are fetched by id of their actual data
    apiKey: string,


    // Ex. https://demo-api.demo-b.vantagediscovery.com/api/v1/items
    // Path to api for fetching items
    apiPath: string,

    
    // Function for getting filters
    // Filters can be use for filtering items
    // default: () => Promise.resolve([])
    getFilter: () => Filter[],

    
    // If account id is not same for getItems
    // Ex. accountId="example" - id we are using to get items ids
    // accountPrefix="example-image" - id we using to get items data that can be different then accountId
    accountPrefix?: string,


    // If collection id is not same for getItems
    // Ex. collectionId="example" - id of collection we are using to get items ids
    // collectionPrefix="example-image" - id of collection we using to get items data that can be different then collectionId  
    collectionPrefix?: string,

    }

    // OR
  
    // Custom customer api type configuration 
    {

    type: "custom",

    // Override this function with your implementation how to map document ID's from Vantage Database to your objects. Use axios or anything you need!
    getCustomerItems: () => itemDTO[],

    // Override this function with your implementation how to map filters to your objects. Use axios or anything you need! 
    // default () => Promise.resolve([]),
    getFilter: () => Filter[]

    } 

     // OR

    //  Fetch data easily from CDN
    {

    type: "cdn",

    // URLs from where to get filters
    filterURL: string[],

    
    // URL pattern for getting items by id
    // Ex. https://something/${id}
    // ${id} will be replaced with id of item  
    itemURLPattern: string,

    
    // If something need to be added to header of request
    authHeader?: string,
    },

    // if some field from get items need aditional transform
    // Ex. objectA:{id:"some id",metaDescription:{ description: ["some text","some text we dont need"] }},
    // objectA is example how object could get back from database
    // customFieldTransformer: { description: { fieldName: "metaDescription.description" , transformer: (desc) => desc.slice(1)}
    // Result of transform : ObjectA:{id:"some id", descrioption:"some text"}
    customFieldTransformer?: ({

    // fields that can be transformed id, description, imageSrc, title, embeddingText, externalUrl , meta: imageLabel, subtitle
    id?: {

        // field name exp:"something.id"
        fieldName?: string,

        // function how to transform field
        transformer?: {} ,
    },

  });


  // Accuracy of search
  // Higher accuracy leads to precise results and longer time execution, and vice versa
  // min value 0
  // max value 1
  // default: 0.5
  defaultAccuracy?: string,


  // What you want to be inital search
  // default "Type in anything you want and explore magic..."
  defaultSearchQuery?: string,


  // Original search results
  // Url pattern to some site to get their search with our search text
  // If setted create link icon that lead to url 
  // Ex. https://google.com/search?q=${query} will get you to google search results for query 
  // Note need to have ${query} that will be replaced with real query
  originalSearchResultsURL?: string,


  // Number of page of results
  // default 0
  pageNumber?: number,


  // Number of results per page
  // default 20 
  pageSize?: number,


  // Branding specific configuration
  branding?: {

    // Colors of brend
    colors?: {
      
      // Primary color of brend
      // Will be used for left side of start animation, and item score background 
      // default "#BFC9CA"
      primary?: string,

      // Secondary color of brend
      // Will be used as color of moreLikeThisButton and checked filters color 
      // default "#F8C471"
      secondary?: string,
    },

    
    // Url to logo of brend placed in up left corner
    // default "https://img.logoipsum.com/327.svg",
    logoUrl?: string,


    // Title of tab in browser
    // defaut "vite app"
    pageTitle?: string,


    // Placeholder for search when search bar is empty  
    searchPlaceholder?: string,

    // Title on page placed in up center
    // default "Empower your search!"
    title?: string
  },

  // filter specific configuration 
  filter?: {

    // Type of filters
    // default EFilterType.SINGLE_SELECT
    type?: EFiltersType.SINGLE_SELECT | EFiltersType.MULTI_SELECT;

    // Some  popular filters
    // There is a section on the page for quick access of this filters
    getPopularFilters?: {},
  },

  // Shingling specific configuration
  shingling?: {

    // Min value 0
    // Max value 1 
    // default 0
    documentMatchScoreWeight?: number,

    // Min value 0
    // Max value 1 
    // default 0
    queryMatchScoreWeight?: number 

    // Min value 0
    // Max value 1 
    // default 1
    cosineSimilarityScoreWeight?: number,
  },

  // Vibe configuration if setted enables setting up vibes that affects the results 
  vibe?:{

    // Function for getting boards of vibes
    // Pins are actual vibes, board contain array of smillar vibes
    // Ex. const getBoards = async (): Promise<VibeBoard[]> => 
    // return { boards: [{ name :"some name of board", 
    // pins: [{ "id": "some id", image_url: "some img url", "text":"some text that will be used for embeddings"}]}]};};
    getBoards: () => Promise<VibeBoard[]>,

    // number 0-1
    // default 0.25
    // Represents how much vibe influence results
    vibeOverallWeight?: number,

```
## 🚀 START USING IT

#### Generate template with just configuration 

```typescript

import React from "react";
import configuraton from "./configuration";
import { generateTemplateWithConfig } from "vantage-demo-template";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={generateTemplateWithConfig(configuration)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```
#### VantageWrapper

Mandatory wrapper for using vantage hooks and queries
Use our logic with your styling and UI!
```typescript

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

Hooks to incorporate our logic into your UI!

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
    Return active filters as a string in the form: "categoriName1:filterName1 , categoriName2:filterName2"
    -getFilterString: () => string;

    Clear all active filters
    -clearActiveFilters: () => void;
    */
    filterActions,

    /* Get control of the execution of Searching Results
     - a collection id for which results are coming
     collectionId: string;


     - a list of documents retrieved from the Vantage Database and Transformed with Transformer
     items: Item[];

     -time of execution of search
     executionTime: number;

     - a state if items are loading from the Vantage Database
     isLoading: boolean;

     - a state if items are succesfully fetched from the Vantage Database
     isSuccess: boolean;

     - a state if fetching items return some error from the Vantage Detabase
     isError: boolean; */
    searchResults,

    /*
    Variables

    query: string; - used to save state of users search input
    isDeveloperViewToggled: boolean; - used to check whether Developer button is toggled (in order to see a different UI)
    moreLikeDocumentId: string; - used to save state of id of item used in more like this search
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

Hook will first attempt to retrieve parameters from the URL query parameters and override values setted in configuration.
Values that can be overriden by url params: accuracy, customerId, cosine_similarity_score_weight, query_match_score_weight, document_match_score_weight

```typescript
import {useUrlParamsHook} from "vantage-demo-template"

 const {
    /*
    Get data configuration back with overriden values
    */
    dataConfiguration
    /*
    Get search from url
    search url param , save state of user search input
    */
    search
    /*
    Get document id from 
    document id , save state of id selected for more like this
    */
    documentId
  } = useUrlParamsHook(dataConfiguration,
  search,
  documentId);

```


#### useFilterHook

Hook gives back avalabe filter actions

```typescript
import {useFilterHook} from "vantage-demo-template"

 const {
     /*
      Get all available filters
      array of all avalable filters 
    */
    availableFilters: Filter[]; 

    /*
      Get active filters
      array of all filters that are active
    */
    activeFilters: Filter[];

     /*
     Get popular filters
     array of filters that are popular and would be presented as tags for easy activation
    */
    popularFilters: Filter[];

    /*
      Set active filters
      function for saving state of acive filters
    */
    setActiveFilters: (filters: Filter[]) => void;

    /*
      Toggle filters
      function for changing some filter to active, and vise versa
    */
    toggleFilters: (filters: Filter[]) => void;

    /*
     Get filters string
     function return active filters as a string in the form: "categoriName1:filterName1 , categoriName2:filterName2"
    */
    getFilterString: () => string;

    /*
      Clear all active filters
      function deactivates all active filters
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
   * @param vantageSearchURL: Url of vantage search,
   * @param searchConfiguration Search configuration that is customer only related.
   * @param searchParameters A parameters send to Broker to retrieve results.
   * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
   * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
   */
  useSearchByConfiguration,
  /**
   * Performs Vantage More Like This and then it performs getItemsByIds from customerDataHandler.
   *
   * @param vantageSearchURL: Url of vantage search,
   * @param enable: True or false are queri enabled,
   * @param searchConfiguration Search configuration that is customer only related.
   * @param searchParameters A parameters send to Broker to retrieve results.
   * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
   * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
   */
  useMoreLikeThisByConfiguration,

  /**
   * Performs Vantage More Like These and then it performs getItemsByIds from customerDataHandler.
   *
   * @param vantageSearchURL: Url of vantage search,
   * @param enable: True or false are queri enabled,
   * @param searchConfiguration Search configuration that is customer only related.
   * @param searchParameters: A parameters send to Broker to retrieve results.
   * @param customerDataHandler A custom data handler to specify how to fetch customer specific data.
   * @returns {[number, Item[]]} A number representing execution time in ms and list of results.
   */
  useMoreLikeTheseByConfiguration,

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
  * accountId: "ENTER YOUR VANTAGE ACCOUNT ID.",
  * collectionId: "ENTER A LIST OF VANTAGE COLLECTION IDS TO FETCH DATA FROM.",
  * apiKey: "ENTER YOUR VANTAGE API KEY.",
  * vantageSearchURL: "ENTER AN URL TO THE VANTAGE API YOU WANT TO FETCH DATA FROM.", // default https://api.vanta.ge/v1/search
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
  * accountId: "ENTER YOUR VANTAGE ACCOUNT ID.",
  * collectionId: "ENTER A LIST OF VANTAGE COLLECTION IDS TO FETCH DATA FROM.",
  * apiKey: "ENTER YOUR VANTAGE API KEY.",
  * vantageSearchURL: "ENTER AN URL TO THE VANTAGE API YOU WANT TO FETCH DATA FROM.", // default https://api.vanta.ge/v1/search
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
  * accountId: "ENTER YOUR VANTAGE ACCOUNT ID.",
  * collectionId: "ENTER A LIST OF VANTAGE COLLECTION IDS TO FETCH DATA FROM.",
  * apiKey: "ENTER YOUR VANTAGE API KEY.",
  * vantageSearchURL: "ENTER AN URL TO THE VANTAGE API YOU WANT TO FETCH DATA FROM.", // default https://api.vanta.ge/v1/search
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
