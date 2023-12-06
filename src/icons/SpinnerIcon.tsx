import React from "react";
import cn from "utils/cn";

const SpinnerIcon = ({
  className = "h-6 w-6 text-white",
  color = "white",
}: {
  className?: string;
  color?: string;
}): JSX.Element => {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      data-testid="spinner-icon"
    >
      <path
        d="M43.8333 22.9999C43.8333 11.4937 34.5062 2.16658 22.9999 2.16658C11.4937 2.16658 2.16658 11.4937 2.16658 22.9999C2.16658 34.5062 11.4937 43.8332 22.9999 43.8333"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SpinnerIcon;
