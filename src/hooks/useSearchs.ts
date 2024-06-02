import { UseQueriesType } from "abstracts/useQueriesType";
import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { VantageSearchQueries } from "queries/VantageSearchQueries";
import { UseVibeType } from "abstracts/VibeTypes";
import {
  transformToAddWeightToThese,
  transformToAddWeightToTheseOnVibe,
} from "transformers/VantageProductTransformers";
import { SortParameters, UseCustomerAPIType } from "abstracts";
import { useMoreLikeTheseType } from "abstracts/useMoreLikeTheseType";

const useSearchs = ({
  dataConfiguration,
  query,
  moreLikeDocumentId,
  isMoreLikeTheseActive,
  vibeHandler,
  filters,
  customerAPI,
  moreLikeTheseHandler,
  sort,
}: {
  dataConfiguration: DataConfiguration;
  query: string;
  moreLikeDocumentId: string;
  filters: string;
  isMoreLikeTheseActive: boolean;
  vibeHandler: UseVibeType;
  customerAPI: UseCustomerAPIType;
  moreLikeTheseHandler: useMoreLikeTheseType;
  sort?: SortParameters;
}): UseQueriesType => {
  const multiQuerySearchResults = VantageSearchQueries.useSearchByConfiguration(
    dataConfiguration.vantageSearchURL,
    dataConfiguration.collectionIds.map((collectionId: string) => ({
      apiKey: dataConfiguration.apiKey,
      customerId: dataConfiguration.accountId,
      customerNamespace: collectionId,
    })),
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
    }
  );

  const multiMLTSearchResults =
    VantageSearchQueries.useMoreLikeThisByConfiguration(
      dataConfiguration.vantageSearchURL,
      vibeHandler.activeVibe.length === 0 && moreLikeDocumentId.length > 0,
      dataConfiguration.collectionIds.map((collectionId: string) => ({
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: collectionId,
      })),
      {
        filters: filters,
        documentId: moreLikeDocumentId,
        accuracy: dataConfiguration.defaultAccuracy,
        pageNumber: dataConfiguration.pageNumber,
        pageSize: dataConfiguration.pageSize,
        sortParameters: sort,
        threshold: sort?.threshold,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );

  const multiVibeSearchResults =
    VantageSearchQueries.useMoreLikeTheseByConfiguration(
      dataConfiguration.vantageSearchURL,
      isMoreLikeTheseActive && moreLikeDocumentId.length === 0,
      dataConfiguration.collectionIds.map((collectionId: string) => ({
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: collectionId,
      })),
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
        experimental: dataConfiguration?.experimental,
        sortParameters: sort,
        threshold: sort?.threshold,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );
  const multiVibeDocumentIdResults =
    VantageSearchQueries.useMoreLikeTheseByConfiguration(
      dataConfiguration.vantageSearchURL,
      isMoreLikeTheseActive && moreLikeDocumentId.length > 0,
      dataConfiguration.collectionIds.map((collectionId: string) => ({
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: collectionId,
      })),
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
        experimental: dataConfiguration?.experimental,
        sortParameters: sort,
        threshold: sort?.threshold,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );

  const multiMoreLikeTheseResults =
    VantageSearchQueries.useMoreLikeTheseByConfiguration(
      dataConfiguration.vantageSearchURL,
      moreLikeTheseHandler.isActive,
      dataConfiguration.collectionIds.map((collectionId: string) => ({
        apiKey: dataConfiguration.apiKey,
        customerId: dataConfiguration.accountId,
        customerNamespace: collectionId,
      })),
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
        experimental: dataConfiguration?.experimental,
        sortParameters: sort,
        threshold: sort?.threshold,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );

  return {
    multiQuerySearchResults,
    multiMLTSearchResults,
    multiVibeSearchResults,
    multiVibeDocumentIdResults,
    multiMoreLikeTheseResults,
  };
};

export default useSearchs;
