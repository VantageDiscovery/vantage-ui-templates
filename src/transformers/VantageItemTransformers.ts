import {
  CustomFieldSpecification,
  CustomFieldTransformer,
} from "abstracts/CustomerApiTypes";
import { ItemDTO, ItemWithoutScore } from "abstracts/ItemTypes";

const parseStringAccessToArray = (
  object: object,
  stringElement: string
): object => {
  const parts = stringElement.split("[");
  let newValue = object[parts[0] as keyof typeof object];
  for (const arrayIndex of parts
    .slice(1)
    .map((element) => element.slice(0, -1))) {
    newValue = newValue[arrayIndex as unknown as number];
  }
  return newValue;
};

const ItemDTOCustomFieldToMetaField = (
  item: object,
  dtoFieldName: string
): string => {
  const nestedObjects = dtoFieldName.split(".");
  let currentValue: object = item;
  for (const nestedObject of nestedObjects) {
    if (nestedObject.includes("[")) {
      currentValue = parseStringAccessToArray(currentValue, nestedObject);
      continue;
    }
    currentValue = currentValue[nestedObject as keyof typeof currentValue];
  }
  return currentValue as unknown as string;
};

const transformWithCustomField = (
  object: object,
  defaultValue: string,
  fieldMapper?: CustomFieldSpecification
) => {
  if (!fieldMapper) {
    return defaultValue;
  }
  const fieldValue = ItemDTOCustomFieldToMetaField(
    object,
    fieldMapper.fieldName
  );
  if (fieldMapper.transformer) {
    return fieldMapper.transformer(fieldValue);
  }
  return fieldValue;
};

export const TransformItemDTOToView = (
  item: ItemDTO,
  customMetaFieldsMapper?: CustomFieldTransformer
): ItemWithoutScore => {
  return {
    id: transformWithCustomField(item, item.id, customMetaFieldsMapper?.id),
    description: transformWithCustomField(
      item,
      item.description,
      customMetaFieldsMapper?.description
    ),
    imageSrc: transformWithCustomField(
      item,
      item.image_url,
      customMetaFieldsMapper?.imageSrc
    ),
    title: transformWithCustomField(
      item,
      item.title,
      customMetaFieldsMapper?.title
    ),
    embeddingText: transformWithCustomField(
      item,
      item.text,
      customMetaFieldsMapper?.embeddingText
    ),
    externalUrl: transformWithCustomField(
      item,
      item.url,
      customMetaFieldsMapper?.externalUrl
    ),
    meta: {
      imageLabel: transformWithCustomField(
        item,
        "",
        customMetaFieldsMapper?.imageLabel
      ),
      subtitle: transformWithCustomField(
        item,
        "",
        customMetaFieldsMapper?.subtitle
      ),
    },
  };
};
