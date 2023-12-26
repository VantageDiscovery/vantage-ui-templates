import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import {
  CustomAPIConfiguration,
  ECustomerAPIType,
  UseCustomerAPIType,
  VantageAPIConfiguration,
} from "abstracts/CustomerApiTypes";
import VantageAPIService from "../services/VantageItemService";
import { ItemWithoutScore } from "abstracts/ItemTypes";
import { useMemo } from "react";

interface CustomerAPIStrategy {
  getItemsByIds(ids: string[]): Promise<ItemWithoutScore[]>;
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
}
class CustomAPIStrategy implements CustomerAPIStrategy {
  constructor(public configuration: DataConfiguration) {}

  getItemsByIds(ids: string[]) {
    const customAPIConfig = this.configuration
      .customerAPI as CustomAPIConfiguration;
    return customAPIConfig.getCustomerItems(ids);
  }
}

const CustomerAPITypeToStrategy: (
  configuration: DataConfiguration
) => Record<ECustomerAPIType, CustomerAPIStrategy> = (
  config: DataConfiguration
) => ({
  [ECustomerAPIType.VANTAGE_API]: new VantageAPIStrategy(config),
  [ECustomerAPIType.CUSTOM_API]: new CustomAPIStrategy(config),
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

  return {
    getItemsByIds,
  };
};

export default useCustomerAPI;
