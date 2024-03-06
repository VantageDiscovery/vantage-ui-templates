import { ECustomerAPIType, ECustomerString } from "abstracts/CustomerApiTypes";
import {
  ClientConfiguration,
  Configuration,
  CustomFieldTransformer,
  EDemoTemplate,
  ETemplateString,
} from "abstracts/DemoConfigurationTypes";
import { EFiltersType } from "abstracts/FilterTypes";

const DEFAULT_CONFIGURATION = {
  template: EDemoTemplate.PRODUCT,
  defaultAccuracy: "0.5",
  defaultSearchQuery: "Type in anything you want and explore magic...",
  vantageSearchURL: "https://api.vanta.ge/v1/search",
  branding: {
    logoUrl: "https://img.logoipsum.com/327.svg",
    title: "Empower your search!",
    colors: {
      primary: "#BFC9CA",
      secondary: "#F8C471",
    },
  },
  filter: {
    type: EFiltersType.SINGLE_SELECT,
  },
  customerAPI: {
    getFilters: () => Promise.resolve([]),
  },
  shingling: {
    documentMatchScoreWeight: 0,
    queryMatchScoreWeight: 0,
    cosineSimilarityScoreWeight: 1,
  },
  fieldValueWeighting: {
    queryKeyWordWeightingMode: "uniform",
    queryKeyWordMaxOverallWeight: 1.1,
  },
  pageNumber: 0,
  pageSize: 20,
  enableMoreLikeThis: false,
};

function assignDefined(target: object, source: object) {
  for (const key of Object.keys(source)) {
    const keyCasted = key as keyof typeof source;
    const value = source[keyCasted];
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      // it is non-primitive - do recursion.
      if (!target[keyCasted]) {
        (target[keyCasted] as object) = {};
      }
      assignDefined(target[keyCasted], value);
      continue;
    }

    if (value !== undefined) {
      target[keyCasted] = value;
    }
  }

  return target;
}

const useEnumsAPIType: Record<ECustomerString, ECustomerAPIType> = {
  ["vantage"]: ECustomerAPIType.VANTAGE_API,
  ["custom"]: ECustomerAPIType.CUSTOM_API,
  ["cdn"]: ECustomerAPIType.CDN_API,
};

const TransformCustomerAPICustomFieldsToSpecification = (
  configuration: ClientConfiguration
): ClientConfiguration => {
  if (
    useEnumsAPIType[configuration.customerAPI.type] ===
    ECustomerAPIType.CUSTOM_API
  ) {
    return configuration;
  }
  if (!configuration.customFieldTransformer) {
    return configuration;
  }
  return {
    ...configuration,
    customFieldTransformer: Object.entries(
      configuration.customFieldTransformer
    ).reduce((previous: CustomFieldTransformer, current) => {
      if (typeof current[1] === "string") {
        previous[current[0] as keyof typeof previous] = {
          fieldName: current[1],
        };
        return previous;
      }
      previous[current[0] as keyof typeof previous] = current[1];
      return previous;
    }, {}),
  };
};

const useEnumsTemplate: Record<ETemplateString, EDemoTemplate> = {
  ["product"]: EDemoTemplate.PRODUCT,
  ["publisher"]: EDemoTemplate.PUBLISHER,
  ["publisherWithMltOnGrid"]: EDemoTemplate.PUBLISHER_WITH_MLT_ON_GRID,
  ["pins"]: EDemoTemplate.PINS,
};

const TransformStringFieldsToEnums = (
  configuration: ClientConfiguration
): ClientConfiguration => {
  return {
    ...configuration,
    template: useEnumsTemplate[configuration.template ?? "product"],
  };
};

export const GetConfigurationWithDefaultValues = (
  customerConfiguration: ClientConfiguration
): Configuration => {
  let collectionIds = customerConfiguration.collectionId;
  if (!Array.isArray(collectionIds)) {
    collectionIds = [collectionIds ?? ""];
  }

  const config = TransformStringFieldsToEnums(customerConfiguration);

  const configuration = TransformCustomerAPICustomFieldsToSpecification(config);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return assignDefined(DEFAULT_CONFIGURATION, {
    ...configuration,
    collectionIds,
  });
};
