import { ItemDTO, ItemWithoutScore } from "abstracts/ItemTypes";
import axios, { AxiosResponse } from "axios";
import { TransformItemDTOToView } from "../transformers/VantageItemTransformers";
import { Filter } from "abstracts/FilterTypes";
import { CustomFieldTransformer } from "abstracts/DemoConfigurationTypes";

const getItemsByIds = async (
  itemURLPattern: string,
  itemIds: string[],
  customTransformer?: CustomFieldTransformer
): Promise<ItemWithoutScore[]> => {
  const promises = itemIds.map((id) =>
    axios
      .get(itemURLPattern.replace("${id}", id))
      .then((response: AxiosResponse<ItemDTO>) =>
        TransformItemDTOToView(response.data, customTransformer)
      )
  );
  return Promise.all(promises);
};

const getFilters = async (filtersUrl: string[]): Promise<Filter[]> => {
  const promises = filtersUrl.map((url) =>
    axios.get(url).then((response: AxiosResponse<Filter[]>) => {
      return response.data;
    })
  );
  const allFilters = await Promise.all(promises);

  return allFilters.flat(1);
};

const CdnAPIService = {
  getItemsByIds,
  getFilters,
};

export default CdnAPIService;
