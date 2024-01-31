import { UseUrlParametersType } from "../abstracts/UrlParametersType";
import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetConfigurationWithParameterValues } from "transformers/QueryParametersTransformer";
import { useQueryParam, StringParam } from "use-query-params";

const useUrlParameters = ({
  dataConfiguration,
  search,
  documentId,
}: {
  dataConfiguration: DataConfiguration;
  search?: string;
  documentId?: string;
}): UseUrlParametersType => {
  const location = useLocation();
  const searchParameters = new URLSearchParams(location.search);

  const [searchUrl, setSearchUrl] = useQueryParam("search", StringParam);
  const [documentIdUrl, setDocumentIdUrl] = useQueryParam(
    "document_id",
    StringParam
  );

  const setSearch = (text: string) => {
    setSearchUrl(text, "pushIn");
    setDocumentIdUrl(undefined, "replaceIn");
  };
  const setDocument = (text: string) => {
    setDocumentIdUrl(text, "pushIn");
    setSearchUrl(undefined, "replaceIn");
  };

  return {
    dataConfiguration: GetConfigurationWithParameterValues(
      dataConfiguration,
      searchParameters
    ),
    search: searchUrl ?? "",
    documentId: documentIdUrl ?? "",
    setSearchUrl: setSearch,
    setDocumentId: setDocument,
  };
};

export default useUrlParameters;
