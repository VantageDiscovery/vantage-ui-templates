import { ServiceResponseWrapperProperties } from "abstracts";
import NoResultsIllustration from "icons/NoResultsIllustration";
import SpinnerIcon from "icons/SpinnerIcon";
import React from "react";

const ServerResponseWrapper = ({
  isLoading,
  isError,
  isSuccess,
  isNoResults,
  children,
  loadingMessage = "Loading",
  loadingSpinnerColor = "black",
}: ServiceResponseWrapperProperties): JSX.Element => {
  return (
    <>
      {isLoading && (
        <div className="flex flex-col w-full items-center gap-4 my-10">
          <SpinnerIcon className="w-12 h-12" color={loadingSpinnerColor} />
          <p className="text-2xl font-bold">{`${loadingMessage}...`}</p>
          <p>Whipping up the perfect data just for you — stay tuned!</p>
        </div>
      )}
      {isNoResults && (
        <div className="flex flex-col w-full items-center gap-4 my-10">
          <NoResultsIllustration />
          <p className="text-2xl font-bold">No results found.</p>
          <p>
            We couldn’t found find what you searched for. Try searching again.
          </p>
        </div>
      )}
      {isSuccess && !isError && !isLoading && !isNoResults && children}
    </>
  );
};

export default ServerResponseWrapper;
