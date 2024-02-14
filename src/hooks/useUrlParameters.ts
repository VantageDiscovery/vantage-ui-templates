import { UseUrlParametersType } from "../abstracts/UrlParametersType";
import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { useLocation } from "react-router-dom";
import { GetConfigurationWithParameterValues } from "transformers/QueryParametersTransformer";
import { useQueryParam, StringParam } from "use-query-params";

const useUrlParameters = ({
  dataConfiguration,
}: {
  dataConfiguration: DataConfiguration;
}): UseUrlParametersType => {
  const location = useLocation();
  const searchParameters = new URLSearchParams(location.search);

  const [searchUrl, setSearchUrl] = useQueryParam("search", StringParam);
  const [documentIdUrl, setDocumentIdUrl] = useQueryParam(
    "document_id",
    StringParam
  );
  const [filterUrl, setFiltersUrl] = useQueryParam("filters", StringParam);

  const setSearch = (text: string) => {
    setSearchUrl(text, "pushIn");
    setDocumentIdUrl(undefined, "replaceIn");
  };
  const setDocument = (id: string) => {
    setDocumentIdUrl(id, "pushIn");
    setSearchUrl(undefined, "replaceIn");
    setFiltersUrl(undefined, "replaceIn");
  };

  const setFilters = (filters?: string) => {
    setFiltersUrl(filters ?? undefined, filters ? "pushIn" : "replaceIn");
    setDocumentIdUrl(undefined, "replaceIn");
  };

  return {
    dataConfiguration: GetConfigurationWithParameterValues(
      dataConfiguration,
      searchParameters
    ),
    search: searchUrl ?? "",
    documentId: documentIdUrl ?? "",
    filters: filterUrl ?? "",
    setSearchUrl: setSearch,
    setDocumentId: setDocument,
    setFiltersUrl: setFilters,
  };
};

export default useUrlParameters;
