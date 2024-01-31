import { DataConfiguration } from "./DemoConfigurationTypes";

export type UseUrlParametersType = {
  dataConfiguration: DataConfiguration;
  search: string;
  documentId: string;
  setSearchUrl: (text: string) => void;
  setDocumentId: (text: string) => void;
};
