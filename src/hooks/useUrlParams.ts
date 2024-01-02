/* eslint-disable unicorn/prevent-abbreviations */
import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { useLocation } from "react-router-dom";
import { GetConfigurationWithParameterValues } from "transformers/DataConfigurationTransformer";

const useUrlParams = ({
  dataConfiguration,
}: {
  dataConfiguration: DataConfiguration;
}): DataConfiguration => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return GetConfigurationWithParameterValues(dataConfiguration, searchParams);
};

export default useUrlParams;
