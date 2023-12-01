import { DataConfiguration } from "abstracts/DemoConfigurationTypes";
import { Filter } from "abstracts/FilterTypes";
import React, { createContext, useContext } from "react";

type DemoContextType = {
  input: string;
  activeFilters: Filter[];
};

const DemoContext = createContext<DemoContextType>({
  input: "default",
} as DemoContextType);

export const DemoProvider = ({
  children,
  configuration,
}: {
  children: JSX.Element;
  configuration: DataConfiguration;
}) => {

  return (
    <DemoContext.Provider value={{ input: "test", activeFilters: [] }}>
      {children}
    </DemoContext.Provider>
  );
};

export default function useDemo() {
  return useContext(DemoContext);
}
