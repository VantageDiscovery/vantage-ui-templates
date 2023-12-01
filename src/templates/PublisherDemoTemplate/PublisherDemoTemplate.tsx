import { BrandingConfiguration } from "abstracts/DemoConfigurationTypes";
import useDemo from "contexts/DemoContext";
import React, { useEffect } from "react";

const PublisherDemoTemplate = ({
  configuration,
}: {
  configuration: BrandingConfiguration;
}): JSX.Element => {
  const { input } = useDemo();

  useEffect(() => {
    console.log(input);
  }, []);

  return <div>Publisher: {input}</div>;
};

export default PublisherDemoTemplate;
