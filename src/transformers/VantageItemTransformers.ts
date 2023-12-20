import { CustomFieldTransformer } from "abstracts/CustomerApiTypes";
import { ItemDTO, ItemWithoutScore } from "abstracts/ItemTypes";

const parseStringAccessToArray = (
  object: object,
  stringElement: string
): object => {
  const parts = stringElement.split("[");
  let newValue = object[parts[0] as keyof typeof object];
  for (const arrayIndex of parts.slice(1)) {
    newValue = newValue[arrayIndex as unknown as number];
  }
  return newValue;
};

const ItemDTOCustomFieldToMetaField = (
  item: ItemDTO,
  dtoFieldName: string
): string => {
  if (dtoFieldName.includes(".")) {
    // object logic
    return "";
  }
  if (dtoFieldName.includes("[")) {
    // array logic
  }

  return item.noopMeta[dtoFieldName as keyof typeof item.noopMeta];
};

export const TransformItemDTOToView = (
  item: ItemDTO,
  customMetaFieldsMapper?: CustomFieldTransformer
): ItemWithoutScore => {
  return {
    id: item.id,
    description: item.noopMeta.description,
    imageSrc: item.noopMeta.image_url,
    title: item.noopMeta.title,
    embeddingText: item.noopMeta.text,
    externalUrl: item.noopMeta.url,
    meta: {
      imageLabel: customMetaFieldsMapper?.imageLabel
        ? item.noopMeta[
            customMetaFieldsMapper?.imageLabel as keyof typeof item.noopMeta
          ]
        : "",
      subtitle: customMetaFieldsMapper?.subtitle
        ? item.noopMeta[
            customMetaFieldsMapper?.subtitle as keyof typeof item.noopMeta
          ]
        : "",
    },
  };
};
