import { BrandingConfiguration } from "abstracts/DemoConfigurationTypes";
import useDemo from "contexts/DemoContext";
import React from "react";

const ProductDemoTemplate = ({
  configuration,
}: {
  configuration: BrandingConfiguration;
}): JSX.Element => {
  const { input, activeFilters } = useDemo();

  return <div>Product: {input}</div>;
};

export default ProductDemoTemplate;
