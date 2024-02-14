import { DataConfiguration } from "./DemoConfigurationTypes";

export type UseUrlParametersType = {
  dataConfiguration: DataConfiguration;
  search: string;
  documentId: string;
  filters: string;
  setSearchUrl: (text: string) => void;
  setDocumentId: (id: string) => void;
  setFiltersUrl: (filters?: string) => void;
};
