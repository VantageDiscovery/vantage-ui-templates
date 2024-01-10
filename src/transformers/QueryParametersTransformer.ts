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
  };
};
