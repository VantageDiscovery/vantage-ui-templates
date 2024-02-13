import { DataConfiguration } from "abstracts";
import Modal from "component/layout/Modal";
import React from "react";

const DeveloperDebugModal = ({
  isModalVisible,
  toggleModal,
  dataConfiguration,
}: {
  isModalVisible: boolean;
  toggleModal: () => void;
  dataConfiguration: DataConfiguration;
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      className="flex flex-col relative w-1/4 h-4/5 rounded-3xl bg-white p-5"
      onCloseModal={toggleModal}
    >
      <article className="flex flex-col gap-3 m-2  overflow-y-scroll scrollbar-small">
        <header className="justify-center text-center text-2xl font-semibold mb-3">
          Data configuration
        </header>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold">Collection id:</p>
          <p>{dataConfiguration.collectionIds}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold">Account id:</p>
          <p>{dataConfiguration.accountId}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">Api key:</p>
          <p>{dataConfiguration.apiKey}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">Search url:</p>
          <p>{dataConfiguration.vantageSearchURL}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold">Customer api:</p>
          <p>{dataConfiguration.customerAPI.type}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">Accuracy:</p>
          <p>{dataConfiguration.defaultAccuracy}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Filter type:
          </p>
          <p>{dataConfiguration.filter.type}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Original search url:
          </p>
          <p>{dataConfiguration.originalSearchResultsURL ?? "no value"}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Page number:
          </p>
          <p>{dataConfiguration.pageNumber}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">Page size:</p>
          <p>{dataConfiguration.pageSize}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Vibe weight:
          </p>
          <p>{dataConfiguration.vibe?.vibeOverallWeight ?? "no value"}</p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Cosine similarity score weight:
          </p>
          <p>
            {dataConfiguration.shingling.cosineSimilarityScoreWeight ??
              "no value"}
          </p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Document macth score weight:
          </p>
          <p>
            {dataConfiguration.shingling.documentMatchScoreWeight ?? "no value"}
          </p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Query macth score weight:
          </p>
          <p>
            {dataConfiguration.shingling.queryMatchScoreWeight ?? "no value"}
          </p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Query key word max overall weight:
          </p>
          <p>
            {dataConfiguration.fieldValueWeighting.queryKeyWordMaxOverallWeight}
          </p>
        </span>
        <span className="flex gap-2 items-baseline">
          <p className="text-lg font-semibold whitespace-nowrap">
            Query key word weighting mode:
          </p>
          <p>
            {dataConfiguration.fieldValueWeighting.queryKeyWordWeightingMode}
          </p>
        </span>
      </article>
    </Modal>
  );
};

export default DeveloperDebugModal;
