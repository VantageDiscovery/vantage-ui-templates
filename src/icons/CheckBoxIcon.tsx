import React from "react";

const CheckBoxIcon = ({
  stroke = "none",
}: {
  stroke: string;
}): React.JSX.Element => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9995 5.66663L7.39951 12.3333L4.99951 9.66663"
        stroke={stroke}
        strokeWidth="0.96"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17H15C16.1046 17 17 16.1046 17 15V3C17 1.89543 16.1046 1 15 1Z"
        stroke="black"
        strokeWidth="0.96"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckBoxIcon;
