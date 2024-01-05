import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import {
  CDNAPIConfiguration,
  CustomAPIConfiguration,
  ECustomerAPIType,
  UseCustomerAPIType,
  VantageAPIConfiguration,
} from "abstracts/CustomerApiTypes";
import VantageAPIService from "../services/VantageApiService";
import { ItemWithoutScore } from "abstracts/ItemTypes";
import { useMemo } from "react";
import CdnAPIService from "services/CdnApiService";
import { Filter } from "abstracts/FilterTypes";

interface CustomerAPIStrategy {
  getItemsByIds(ids: string[]): Promise<ItemWithoutScore[]>;
  getFilters(): Promise<Filter[]>;
}

class VantageAPIStrategy implements CustomerAPIStrategy {
  constructor(public configuration: DataConfiguration) {}

  getItemsByIds(ids: string[]) {
    const vantageAPIConfig = this.configuration
      .customerAPI as VantageAPIConfiguration;
    return VantageAPIService.getItemsByIds(
      vantageAPIConfig.apiPath,
      vantageAPIConfig.apiKey,
      vantageAPIConfig.accountPrefix || this.configuration.accountId,
      vantageAPIConfig.collectionPrefix ?? this.configuration.collectionIds[0],
      ids,
      vantageAPIConfig.customFieldTransformer
    );
  }
  getFilters() {
    const customAPIConfig = this.configuration
      .customerAPI as CustomAPIConfiguration;
    return customAPIConfig.getFilters();
  }
}
class CustomAPIStrategy implements CustomerAPIStrategy {
  constructor(public configuration: DataConfiguration) {}

  getItemsByIds(ids: string[]) {
    const customAPIConfig = this.configuration
      .customerAPI as CustomAPIConfiguration;
    return customAPIConfig.getCustomerItems(ids);
  }

  getFilters() {
    const customAPIConfig = this.configuration
      .customerAPI as CustomAPIConfiguration;
    return customAPIConfig.getFilters();
  }
}

class CDNAPIStrategy implements CustomerAPIStrategy {
  constructor(public configuration: DataConfiguration) {}

  getItemsByIds(ids: string[]) {
    const cdnAPIConfig = this.configuration.customerAPI as CDNAPIConfiguration;
    return CdnAPIService.getItemsByIds(
      cdnAPIConfig.itemURLPattern,
      ids,
      cdnAPIConfig.customFieldTransformer
    );
  }
  getFilters() {
    const cdnAPIConfig = this.configuration.customerAPI as CDNAPIConfiguration;
    return CdnAPIService.getFilters(cdnAPIConfig.filterURL);
  }
}

const CustomerAPITypeToStrategy: (
  configuration: DataConfiguration
) => Record<ECustomerAPIType, CustomerAPIStrategy> = (
  config: DataConfiguration
) => ({
  [ECustomerAPIType.VANTAGE_API]: new VantageAPIStrategy(config),
  [ECustomerAPIType.CUSTOM_API]: new CustomAPIStrategy(config),
  [ECustomerAPIType.CDN_API]: new CDNAPIStrategy(config),
});

const useCustomerAPI = ({
  dataConfiguration,
}: {
  dataConfiguration: DataConfiguration;
}): UseCustomerAPIType => {
  const strategies = useMemo(() => {
    return CustomerAPITypeToStrategy(dataConfiguration);
  }, [dataConfiguration]);

  const activeStrategy = useMemo(() => {
    return strategies[dataConfiguration.customerAPI.type];
  }, [strategies]);

  const getItemsByIds = (ids: string[]): Promise<ItemWithoutScore[]> => {
    return activeStrategy.getItemsByIds(ids);
  };

  const getFilters = (): Promise<Filter[]> => {
    return activeStrategy.getFilters();
  };

  return {
    getItemsByIds,
    getFilters,
  };
};

export default useCustomerAPI;
