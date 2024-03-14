import { TypeAheadConfiguration } from "./DemoConfigurationTypes";
import { Filter } from "./FilterTypes";

export type TypeAheadType = {
  recomendedFilters?: Filter[];
  recomendedQueries?: string[];
};

export type TypeAheadProperties = {
  query: string;
  typeAhead?: TypeAheadConfiguration;
};
