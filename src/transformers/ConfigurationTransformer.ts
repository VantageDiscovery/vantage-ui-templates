import { ECustomerAPIType } from "abstracts/CustomerApiTypes";
import {
  ClientConfiguration,
  Configuration,
  CustomFieldTransformer,
  EDemoTemplate,
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
  customerApiType: {
    getFilters: () => Promise.resolve([]),
  },
  shingling: {
    documentMatchScoreWeight: 0,
    queryMatchScoreWeight: 0,
    cosineSimilarityScoreWeight: 1,
  },
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

const TransformCustomerAPICustomFieldsToSpecification = (
  configuration: ClientConfiguration
): ClientConfiguration => {
  if (configuration.customerAPI.type === ECustomerAPIType.CUSTOM_API) {
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

export const GetConfigurationWithDefaultValues = (
  customerConfiguration: ClientConfiguration
): Configuration => {
  let collectionIds = customerConfiguration.collectionId;
  if (!Array.isArray(collectionIds)) {
    collectionIds = [collectionIds];
  }
  const configuration = TransformCustomerAPICustomFieldsToSpecification(
    customerConfiguration
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return assignDefined(DEFAULT_CONFIGURATION, {
    ...configuration,
    collectionIds,
  });
};
