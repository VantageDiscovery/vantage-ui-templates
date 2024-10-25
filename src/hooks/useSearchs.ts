import { UseQueriesType } from "abstracts/useQueriesType";
import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { VantageSearchQueries } from "queries/VantageSearchQueries";
import { UseVibeType } from "abstracts/VibeTypes";
import {
  transformToAddWeightToThese,
  transformToAddWeightToTheseOnPersonalization,
  transformToAddWeightToTheseOnVibe,
} from "transformers/VantageProductTransformers";
import { SortParameters, UseCustomerAPIType } from "abstracts";
import { useMoreLikeTheseType } from "abstracts/useMoreLikeTheseType";
import { Action } from "abstracts/ActiveResultTypes";

const useSearchs = ({
  dataConfiguration,
  query,
  moreLikeDocumentId,
  vibeHandler,
  filters,
  customerAPI,
  moreLikeTheseHandler,
  sort,
  setActiveResult,
  personalization_items = [],
  personalization_overall_weight = 0,
}: {
  dataConfiguration: DataConfiguration;
  query: string;
  moreLikeDocumentId: string;
  filters: string;
  vibeHandler: UseVibeType;
  customerAPI: UseCustomerAPIType;
  moreLikeTheseHandler: useMoreLikeTheseType;
  setActiveResult: (result: Action) => void;
  sort?: SortParameters;
  personalization_items?: string[];
  personalization_overall_weight?: number;
}): UseQueriesType => {
  const querySearchResult =
    VantageSearchQueries.useSearchMutationByConfiguration(
      dataConfiguration.vantageSearchURL,
      {
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: dataConfiguration.collectionIds[0],
      },
      {
        query: query,
        accuracy: dataConfiguration.defaultAccuracy,
        filters: filters,
        pageNumber: dataConfiguration.pageNumber,
        pageSize: dataConfiguration.pageSize,
        experimental: dataConfiguration?.experimental,
        sortParameters: sort,
        ...dataConfiguration.shingling,
        ...dataConfiguration?.fieldValueWeighting,
        threshold: sort?.threshold,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      },
      setActiveResult,
      Action.SEMANTIC,
      dataConfiguration.fieldValueWeighting.keyWordWeightingQuery
    );

  const moreLikeThisResult =
    VantageSearchQueries.useMoreLikeThisByConfiguration(
      dataConfiguration.vantageSearchURL,
      {
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: dataConfiguration.collectionIds[0],
      },
      {
        filters: filters,
        documentId: moreLikeDocumentId,
        accuracy: dataConfiguration.defaultAccuracy,
        pageNumber: dataConfiguration.pageNumber,
        pageSize: dataConfiguration.pageSize,
        sortParameters: sort,
        threshold: sort?.threshold,
        experimental: dataConfiguration?.experimental,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      },
      setActiveResult,
      Action.MORE_LIKE_THIS
    );

  const vibeSearchResult = VantageSearchQueries.useMoreLikeTheseByConfiguration(
    dataConfiguration.vantageSearchURL,
    {
      apiKey: dataConfiguration.apiKey,
      customerId: dataConfiguration.accountId,
      customerNamespace: dataConfiguration.collectionIds[0],
    },
    {
      documentId: moreLikeDocumentId,
      accuracy: dataConfiguration.defaultAccuracy,
      pageNumber: dataConfiguration.pageNumber,
      pageSize: dataConfiguration.pageSize,
      filters: filters,
      vibe_overall_weight: vibeHandler.vibeOverallWeight,
      these: transformToAddWeightToTheseOnVibe({
        these: vibeHandler.activeVibe,
        vibe_overall_weight: vibeHandler.vibeOverallWeight,
        query,
      }),
      ...dataConfiguration?.fieldValueWeighting,
      experimental: dataConfiguration?.experimental,
      sortParameters: sort,
      threshold: sort?.threshold,
    },
    {
      getItemsByIds: customerAPI.getItemsByIds,
    },
    setActiveResult,
    Action.VIBE_TEXT
  );
  const vibeDocumentIdResult =
    VantageSearchQueries.useMoreLikeTheseByConfiguration(
      dataConfiguration.vantageSearchURL,
      {
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: dataConfiguration.collectionIds[0],
      },
      {
        accuracy: dataConfiguration.defaultAccuracy,
        documentId: moreLikeDocumentId,
        pageNumber: dataConfiguration.pageNumber,
        pageSize: dataConfiguration.pageSize,
        filters: filters,
        vibe_overall_weight: vibeHandler.vibeOverallWeight,
        these: transformToAddWeightToTheseOnVibe({
          these: vibeHandler.activeVibe,
          vibe_overall_weight: vibeHandler.vibeOverallWeight,
          document_id: moreLikeDocumentId,
          query,
        }),
        ...dataConfiguration?.fieldValueWeighting,
        experimental: dataConfiguration?.experimental,
        sortParameters: sort,
        threshold: sort?.threshold,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      },
      setActiveResult,
      Action.VIBE_DOCUMENT_ID
    );

  const moreLikeTheseResult =
    VantageSearchQueries.useMoreLikeTheseByConfiguration(
      dataConfiguration.vantageSearchURL,
      {
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: dataConfiguration.collectionIds[0],
      },
      {
        documentId: moreLikeDocumentId,
        accuracy: dataConfiguration.defaultAccuracy,
        pageNumber: dataConfiguration.pageNumber,
        pageSize: dataConfiguration.pageSize,
        filters: filters,
        vibe_overall_weight: vibeHandler.vibeOverallWeight,
        these: transformToAddWeightToThese({
          these: moreLikeTheseHandler.activeMLThese,
        }),
        ...dataConfiguration?.fieldValueWeighting,
        experimental: dataConfiguration?.experimental,
        sortParameters: sort,
        threshold: sort?.threshold,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      },
      setActiveResult,
      Action.MORE_LIKE_THESE,
      dataConfiguration.fieldValueWeighting.keyWordWeightingQuery,
      query
    );

  const personalizationMoreLikeTheseResults =
    VantageSearchQueries.useMoreLikeTheseByConfiguration(
      dataConfiguration.vantageSearchURL,
      {
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: dataConfiguration.collectionIds[0],
      },
      {
        documentId: moreLikeDocumentId,
        accuracy: dataConfiguration.defaultAccuracy,
        pageNumber: dataConfiguration.pageNumber,
        pageSize: dataConfiguration.pageSize,
        filters: filters,
        vibe_overall_weight: vibeHandler.vibeOverallWeight,
        these: transformToAddWeightToTheseOnPersonalization({
          personalization_items,
          personalization_overall_weight,
          query,
          document_id: moreLikeDocumentId,
        }),
        ...dataConfiguration?.fieldValueWeighting,
        experimental: dataConfiguration?.experimental,
        sortParameters: sort,
        threshold: sort?.threshold,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      },
      setActiveResult,
      Action.PERSONALIZATION
    );

  return {
    vibeSearchResult,
    vibeDocumentIdResult,
    querySearchResult,
    moreLikeThisResult,
    moreLikeTheseResult,
    personalizationMoreLikeTheseResults,
  };
};

export default useSearchs;
