import React from "react";
import "./App.scss";
import { DemoProvider } from "./contexts/DemoContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import config from "./config";
import {
  Configuration,
  EDemoTemplate,
} from "./abstracts/DemoConfigurationTypes";
import ProductDemoTemplate from "./templates/ProductsDemoTemplate/ProductDemoTemplate";
import PublisherDemoTemplate from "./templates/PublisherDemoTemplate/PublisherDemoTemplate";
import PublisherMoreLikeThisProductTemplete from "templates/PublisherMoreLikeThisProductTemplete/PublisherMoreLikeThisProductTemplete";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const VantageWrapper = ({
  configuration,
  children,
}: {
  configuration: Configuration;
  children: React.JSX.Element;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <DemoProvider configuration={configuration}>
            <Routes>
              <Route path="*" element={children} />
            </Routes>
          </DemoProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export const Application = (configuration: Configuration) => {
  const DemoTemplateToPageTemplate: Record<EDemoTemplate, JSX.Element> = {
    [EDemoTemplate.PRODUCT]: (
      <ProductDemoTemplate brandingConfiguration={configuration.branding} />
    ),
    [EDemoTemplate.PUBLISHER]: (
      <PublisherDemoTemplate brandingConfiguration={configuration.branding} />
    ),
    [EDemoTemplate.PUBLISHER_WITH_MLT_ON_GRID]: (
      <PublisherMoreLikeThisProductTemplete
        brandingConfiguration={configuration.branding}
      />
    ),
  };

  return (
    <VantageWrapper configuration={configuration}>
      {DemoTemplateToPageTemplate[configuration.template]}
    </VantageWrapper>
  );
};

function App() {
  return Application(config);
}

export default App;
