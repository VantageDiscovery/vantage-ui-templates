/* eslint-disable unicorn/prevent-abbreviations */
import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { UseUrlParamsType } from "abstracts/ParamsType";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetConfigurationWithParameterValues } from "transformers/QueryParametersTransformer";
import { useQueryParam, StringParam } from "use-query-params";

const useUrlParams = ({
  dataConfiguration,
  search,
  documentId,
}: {
  dataConfiguration: DataConfiguration;
  search?: string;
  documentId?: string;
}): UseUrlParamsType => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [searchUrl, setSearchUrl] = useQueryParam("search", StringParam);
  const [documentIdUrl, setDocumentIdUrl] = useQueryParam(
    "document_id",
    StringParam
  );

  useEffect(() => {
    if (search?.length) {
      setSearchUrl(search, "pushIn");
      setDocumentIdUrl(undefined, "replaceIn");
      return;
    }
  }, [search]);

  useEffect(() => {
    if (documentId?.length) {
      setDocumentIdUrl(documentId, "pushIn");
      setSearchUrl(undefined, "replaceIn");
      return;
    }
  }, [documentId]);

  return {
    dataConfiguration: GetConfigurationWithParameterValues(
      dataConfiguration,
      searchParams
    ),
    search: searchUrl ?? "",
    documentId: documentIdUrl ?? "",
  };
};

export default useUrlParams;
