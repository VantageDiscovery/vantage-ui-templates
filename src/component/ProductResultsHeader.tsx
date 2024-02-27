import React from "react";
import ToggleButton from "./ToggleButton";
import {
  CollectionSearchResult,
  DataConfiguration,
  DemoVariables,
  UseFiltersType,
} from "abstracts";
import { Link } from "react-router-dom";
import { LinkIcon } from "@heroicons/react/24/outline";

export const ProductResultsHeader = ({
  variables,
  primaryColor,
  setIsDeveloperViewToggled,
  filterActions,
  dataConfiguration,
  searchResult,
}: {
  variables: DemoVariables;
  setIsDeveloperViewToggled: (isEnabled: boolean) => void;
  filterActions: UseFiltersType;
  primaryColor: string;
  dataConfiguration: DataConfiguration;
  searchResult: CollectionSearchResult;
}): React.JSX.Element => {
  return (
    <>
      <div className="flex justify-between w-full">
        {dataConfiguration.originalSearchResultsURL && (
          <span className="flex px-24 w-full justify-start gap-2 items-center line-clamp-1 text-lg">
            <p className="font-medium line-clamp-1">You searched: </p>
            <p className="line-clamp-1">{variables.query}</p>
            <p className="mt-0.5 line-clamp-1">
              <Link
                to={dataConfiguration.originalSearchResultsURL.replace(
                  "${query}",
                  variables.query
                )}
                target="_new"
              >
                <LinkIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </span>
        )}
        {!!searchResult.executionTime && (
          <span className="flex justify-end text-xl mr-24 w-full">
            You have <b className="px-1">{searchResult.items.length}</b>
            search results
            {searchResult.executionTime && (
              <>
                &nbsp;in
                <b className="px-1">
                  {(+searchResult.executionTime / 1000).toFixed(2)}
                  seconds
                </b>
              </>
            )}
          </span>
        )}
      </div>
      <div className="px-24 w-full flex flex-row space-x-5 items-center">
        <ToggleButton
          text="Developer debug"
          checkedColor={primaryColor}
          isEnabled={variables.isDeveloperViewToggled}
          setIsEnabled={setIsDeveloperViewToggled}
          dataConfiguration={dataConfiguration}
        />
        {variables.isDeveloperViewToggled &&
          filterActions.activeFilters.length > 0 && (
            <div className="text-xl leading-none">
              {filterActions.getFilterString()}
            </div>
          )}
      </div>
    </>
  );
};
