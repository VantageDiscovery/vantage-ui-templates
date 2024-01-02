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
      cosine_similarity_score_weight:
        searchParameters.get("cosine_similarity_score_weight") ??
        dataConfiguration.shingling.cosine_similarity_score_weight,
      query_match_score_weight:
        searchParameters.get("query_match_score_weight") ??
        dataConfiguration.shingling.query_match_score_weight,
      document_match_score_weight:
        searchParameters.get("document_match_score_weight") ??
        dataConfiguration.shingling.document_match_score_weight,
    },
  };
};
