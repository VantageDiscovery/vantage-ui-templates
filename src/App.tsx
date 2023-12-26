import React from "react";
import "./App.scss";
import config from "config";
import { DemoProvider } from "./contexts/DemoContext";
import ProductDemoTemplate from "templates/ProductsDemoTemplate/ProductDemoTemplate";
import PublisherDemoTemplate from "templates/PublisherDemoTemplate/PublisherDemoTemplate";
import { EDemoTemplate } from "abstracts/DemoConfigurationTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GetConfigurationWithDefaultValues } from "transformers/ConfigurationTransformer";

// Encapsulation
const configuration = GetConfigurationWithDefaultValues(config);

const DemoTemplateToPageTemplate: Record<EDemoTemplate, JSX.Element> = {
  [EDemoTemplate.PRODUCT]: (
    <ProductDemoTemplate brandingConfiguration={configuration.branding} />
  ),
  [EDemoTemplate.PUBLISHER]: (
    <PublisherDemoTemplate brandingConfiguration={configuration.branding} />
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
      <DemoProvider configuration={configuration}>
        {DemoTemplateToPageTemplate[configuration.template]}
      </DemoProvider>
    </QueryClientProvider>
  );
}

export default App;
