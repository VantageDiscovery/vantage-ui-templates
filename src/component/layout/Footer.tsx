import VantageIcon from "icons/VantageIcon";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full bg-gray-50 justify-center items-center gap-2 h-24 mt-12 animate-fade-in">
      <VantageIcon className="w-24 h-auto animate-appear-vantage-logo" />
      <p>All Rights Reserved by Vantage</p>
    </footer>
  );
};

export default Footer;
