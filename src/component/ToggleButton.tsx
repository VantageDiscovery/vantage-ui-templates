import React from "react";

type ToggleButtonProperties = {
  text: string;
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
  checkedColor?: string;
};

export default function ToggleButton({
  text,
  isEnabled,
  setIsEnabled,
  checkedColor = "#16a34a",
}: ToggleButtonProperties): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <label className="inline-flex gap-4 relative items-center mr-5">
        <input
          type="checkbox"
          className="sr-only peer cursor-pointer"
          checked={isEnabled}
          readOnly
        />
        <button
          onClick={() => {
            setIsEnabled(!isEnabled);
          }}
          style={{ backgroundColor: isEnabled ? checkedColor : "" }}
          data-testid="toggle-button"
          className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
        ></button>
        <span className="text-sm font-medium text-gray-500 uppercase whitespace-nowrap">
          {text}
        </span>
      </label>
    </div>
  );
}
