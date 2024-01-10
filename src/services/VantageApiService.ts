import { ItemDTO, ItemWithoutScore } from "abstracts/ItemTypes";
import axios, { AxiosResponse } from "axios";
import { TransformItemDTOToView } from "../transformers/VantageItemTransformers";
import { CustomFieldTransformer } from "abstracts/DemoConfigurationTypes";

const getItemsByIds = async (
  apiPath: string,
  apiKey: string,
  accountId: string,
  collectionId: string,
  itemIds: string[],
  customTransformer?: CustomFieldTransformer
): Promise<ItemWithoutScore[]> => {
  return axios
    .get(apiPath, {
      params: {
        ids: itemIds,
        clientId: accountId,
        clientNamespace: collectionId,
      },
      headers: { Authorization: apiKey },
    })
    .then((response: AxiosResponse<ItemDTO[]>) =>
      response.data.map((product) =>
        TransformItemDTOToView(product, customTransformer)
      )
    );
};

const VantageAPIService = {
  getItemsByIds,
};

export default VantageAPIService;
