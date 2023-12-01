import React, { useEffect } from "react";
import "./App.scss";
import { config } from "config";
import { DemoProvider } from "./contexts/DemoContext";
import ProductDemoTemplate from "templates/ProductsDemoTemplate/ProductDemoTemplate";
import PublisherDemoTemplate from "templates/PublisherDemoTemplate/PublisherDemoTemplate";
import { EDemoTemplate } from "abstracts/DemoConfigurationTypes";

const DemoTemplateToPageTemplate: Record<EDemoTemplate, JSX.Element> = {
  [EDemoTemplate.PRODUCT]: (
    <ProductDemoTemplate configuration={config.branding} />
  ),
  [EDemoTemplate.PUBLISHER]: (
    <PublisherDemoTemplate configuration={config.branding} />
  ),
};

function App() {
  useEffect(() => {
    console.log(config);
  }, []);
  return (
    <DemoProvider configuration={config}>
      {DemoTemplateToPageTemplate[config.template]}
    </DemoProvider>
  );
}

export default App;
