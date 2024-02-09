import { UseQueriesType } from "abstracts/useQueriesType";
import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { VantageSearchQueries } from "queries/VantageSearchQueries";
import { UseVibeType } from "abstracts/VibeTypes";
import { transformToAddWeightToThese } from "transformers/VantageProductTransformers";
import { UseCustomerAPIType } from "abstracts";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUMBER = 0;

const useQueries = ({
  dataConfiguration,
  query,
  moreLikeDocumentId,
  isMoreLikeTheseActive,
  vibeHandler,
  filters,
  customerAPI,
}: {
  dataConfiguration: DataConfiguration;
  query: string;
  moreLikeDocumentId: string;
  filters: string;
  isMoreLikeTheseActive: boolean;
  vibeHandler: UseVibeType;
  customerAPI: UseCustomerAPIType;
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
      pageNumber: dataConfiguration.pageNumber || DEFAULT_PAGE_NUMBER,
      pageSize: dataConfiguration.pageSize || DEFAULT_PAGE_SIZE,
      ...dataConfiguration.shingling,
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
        documentId: moreLikeDocumentId,
        accuracy: dataConfiguration.defaultAccuracy,
        pageNumber: dataConfiguration.pageNumber || DEFAULT_PAGE_NUMBER,
        pageSize: dataConfiguration.pageSize || DEFAULT_PAGE_SIZE,
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );

  const multiMLTheseSearchResults =
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
        pageNumber: dataConfiguration.pageNumber || DEFAULT_PAGE_NUMBER,
        pageSize: dataConfiguration.pageSize || DEFAULT_PAGE_SIZE,
        filters: filters,
        vibe_overall_weight: vibeHandler.vibeOverallWeight,
        these: transformToAddWeightToThese({
          these: vibeHandler.activeVibe,
          vibe_overall_weight: vibeHandler.vibeOverallWeight,
          query,
        }),
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );
  const multiMLTheseDocumentIdResults =
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
        pageNumber: dataConfiguration.pageNumber || DEFAULT_PAGE_NUMBER,
        pageSize: dataConfiguration.pageSize || DEFAULT_PAGE_SIZE,
        filters: filters,
        vibe_overall_weight: vibeHandler.vibeOverallWeight,
        these: transformToAddWeightToThese({
          these: vibeHandler.activeVibe,
          vibe_overall_weight: vibeHandler.vibeOverallWeight,
          document_id: moreLikeDocumentId,
          query,
        }),
      },
      {
        getItemsByIds: customerAPI.getItemsByIds,
      }
    );

  return {
    multiQuerySearchResults,
    multiMLTSearchResults,
    multiMLTheseSearchResults,
    multiMLTheseDocumentIdResults,
  };
};

export default useQueries;
