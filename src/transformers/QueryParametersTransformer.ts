import { Filter } from "abstracts";
import { DataConfiguration } from "abstracts/DemoConfigurationTypes";

export const GetConfigurationWithParameterValues = (
  dataConfiguration: DataConfiguration,
  searchParameters: URLSearchParams
): DataConfiguration => {
  return {
    ...dataConfiguration,
    collectionIds: [
      searchParameters.get("collectionId") ??
        dataConfiguration.collectionIds.toString(),
    ],
    defaultAccuracy:
      searchParameters.get("accuracy") ?? dataConfiguration.defaultAccuracy,
    shingling: {
      cosineSimilarityScoreWeight: Number(
        searchParameters.get("cosine_similarity_score_weight") ??
          dataConfiguration.shingling.cosineSimilarityScoreWeight
      ),
      queryMatchScoreWeight: Number(
        searchParameters.get("query_match_score_weight") ??
          dataConfiguration.shingling.queryMatchScoreWeight
      ),
      documentMatchScoreWeight: Number(
        searchParameters.get("document_match_score_weight") ??
          dataConfiguration.shingling.documentMatchScoreWeight
      ),
    },
    fieldValueWeighting: {
      queryKeyWordWeightingMode:
        searchParameters.get("query_key_word_weighting_mode") ??
        dataConfiguration.fieldValueWeighting.queryKeyWordWeightingMode,
      queryKeyWordMaxOverallWeight: Number(
        searchParameters.get("query_key_word_max_overall_weight") ??
          dataConfiguration.fieldValueWeighting.queryKeyWordMaxOverallWeight
      ),
    },
  };
};

export const TransformFiltersStringToFilterObjects = (
  filters: string,
  avalableFilters: Filter[]
): Filter[] => {
  const arrayFilters = new Set(
    filters
      .split(/\b(?:AND|OR)\b/g)
      .map((filter) => filter.replaceAll(/[\s"()]/g, ""))
  );

  const initialFilters = avalableFilters.filter((element) => {
    return arrayFilters.has(element.categorySlug + ":" + element.slug);
  });

  if (filters && initialFilters.length === 0)
    console.error("Sorry, no avalable filter found for your filter in url");

  return initialFilters;
};
