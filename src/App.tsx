import React from "react";
import "./App.scss";
import config from "config";
import { DemoProvider } from "./contexts/DemoContext";
import ProductDemoTemplate from "templates/ProductsDemoTemplate/ProductDemoTemplate";
import PublisherDemoTemplate from "templates/PublisherDemoTemplate/PublisherDemoTemplate";
import { EDemoTemplate } from "abstracts/DemoConfigurationTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

const DemoTemplateToPageTemplate: Record<EDemoTemplate, JSX.Element> = {
  [EDemoTemplate.PRODUCT]: (
    <ProductDemoTemplate brandingConfiguration={config.branding} />
  ),
  [EDemoTemplate.PUBLISHER]: (
    <PublisherDemoTemplate brandingConfiguration={config.branding} />
  ),
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <DemoProvider configuration={config}>
            <Routes>
              <Route
                path="*"
                element={DemoTemplateToPageTemplate[config.template]}
              />
            </Routes>
          </DemoProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
