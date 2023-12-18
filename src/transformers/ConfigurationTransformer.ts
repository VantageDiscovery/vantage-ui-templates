import {
  ClientConfiguration,
  Configuration,
  EDemoTemplate,
} from "abstracts/DemoConfigurationTypes";

const DEFAULT_CONFIGURATION = {
  template: EDemoTemplate.PRODUCT,
  defaultAccuracy: "0.5",
  defaultSearchQuery: "Type in anything you want and explore magic...",
  branding: {
    logoUrl: "https://img.logoipsum.com/327.svg",
    title: "Empower your search!",
    colors: {
      primary: "#BFC9CA",
      secondary: "#F8C471",
    },
  },
  filter: {
    getFilters: () => Promise.resolve([]),
  },
};

// This is intentionally generic method
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assignDefined(target: any, source: any) {
  for (const key of Object.keys(source)) {
    const keyCasted = key as keyof typeof source;
    const value = source[keyCasted];
    if (value === Object(value) && !Array.isArray(value)) {
      // it is non-primitive - do recursion.
      assignDefined(target[keyCasted], value);
      continue;
    }
    if (value !== undefined) {
      target[keyCasted] = value;
    }
  }
  return target;
}

export const GetConfigurationWithDefaultValues = (
  customerConfiguration: ClientConfiguration
): Configuration => {
  let collectionIds = customerConfiguration.collectionId;
  if (!Array.isArray(collectionIds)) {
    collectionIds = [collectionIds];
  }
  return assignDefined(DEFAULT_CONFIGURATION, {
    ...customerConfiguration,
    collectionIds,
  });
};
