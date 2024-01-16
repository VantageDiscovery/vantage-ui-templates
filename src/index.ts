import { Application } from "./App";
import { ClientConfiguration } from "./abstracts/DemoConfigurationTypes";
import { GetConfigurationWithDefaultValues } from "./transformers/ConfigurationTransformer";

export function generateTampleteWithConfig(configuration: ClientConfiguration) {
  return Application(GetConfigurationWithDefaultValues(configuration));
}

export * from "./abstracts";
// export * from "abstracts";
