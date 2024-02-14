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
  const configData = [
    { label: "Collection id:", value: dataConfiguration.collectionIds },
    { label: "Account id:", value: dataConfiguration.accountId },
    { label: "Api key:", value: dataConfiguration.apiKey },
    { label: "Search url:", value: dataConfiguration.vantageSearchURL },
    { label: "Customer api type:", value: dataConfiguration.customerAPI.type },
    { label: "Accuracy:", value: dataConfiguration.defaultAccuracy },
    { label: "Filter type:", value: dataConfiguration.filter.type },
    {
      label: "Original search url:",
      value: dataConfiguration.originalSearchResultsURL ?? "no value",
    },
    { label: "Page number:", value: dataConfiguration.pageNumber },
    { label: "Page size:", value: dataConfiguration.pageSize },
    { label: "Vibe weight:", value: dataConfiguration.vibe?.vibeOverallWeight },
    {
      label: "Cosine similarity score weight:",
      value:
        dataConfiguration.shingling.cosineSimilarityScoreWeight ?? "no value",
    },
    {
      label: "Document macth score weight:",
      value: dataConfiguration.shingling.documentMatchScoreWeight ?? "no value",
    },
    {
      label: "Query macth score weight:",
      value: dataConfiguration.shingling.queryMatchScoreWeight ?? "no value",
    },
    {
      label: "Query key word max overall weight:",
      value:
        dataConfiguration.fieldValueWeighting.queryKeyWordMaxOverallWeight ??
        "no value",
    },
    {
      label: "Query key word weighting mode:",
      value:
        dataConfiguration.fieldValueWeighting.queryKeyWordWeightingMode ??
        "no value",
    },
  ];

  return (
    <Modal
      isVisible={isModalVisible}
      className="flex flex-col relative w-1/4 h-4/5 rounded-3xl bg-white p-5"
      onCloseModal={toggleModal}
    >
      <article className="flex flex-col gap-2 m-2 overflow-y-scroll scrollbar-small">
        <header className="justify-center text-center text-2xl font-semibold mb-3">
          Data configuration
        </header>
        {configData.map((data) => (
          <span key={data.label} className="flex gap-2 items-baseline">
            <p className="text-lg font-semibold whitespace-nowrap">
              {data.label}
            </p>
            <p>{data.value}</p>
          </span>
        ))}
      </article>
    </Modal>
  );
};

export default DeveloperDebugModal;
