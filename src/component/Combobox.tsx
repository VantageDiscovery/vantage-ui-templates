import React, {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import cn from "utils/cn";

interface ComboboxProperties {
  data: string[];
  onSelectedAction: (selectedValue?: string) => void;
  activeValue?: string;
  className?: string;
  placeholder?: string;
  allowNoValue?: boolean;
}

interface ChipComboboxState {
  inputValue: string;
  isDropDownOpen: boolean;
  keyboardSelectedIndex: number;
  selectedValue?: string;
}

const DEFAULT_COMBOBOX_STATE = {
  isDropDownOpen: false,
  inputValue: "",
  keyboardSelectedIndex: 0,
};

enum ChipComboBoxAction {
  OPEN_DROPDOWN,
  CLOSE_DROPDOWN,
  SET_SELECTED_VALUE,
  CLEAR_SELECTED_VALUE,
  SEARCH_VALUE,
  ARROW_UP,
  ARROW_DOWN,
}

const reducer = (
  state: ChipComboboxState,
  action: { type: ChipComboBoxAction; value?: string }
): ChipComboboxState => {
  switch (action.type) {
    case ChipComboBoxAction.CLOSE_DROPDOWN: {
      return {
        ...state,
        isDropDownOpen: false,
      };
    }
    case ChipComboBoxAction.OPEN_DROPDOWN: {
      return {
        ...state,
        isDropDownOpen: true,
      };
    }
    case ChipComboBoxAction.SET_SELECTED_VALUE: {
      return {
        ...state,
        inputValue: "",
        selectedValue: action.value,
        isDropDownOpen: false,
        keyboardSelectedIndex: 0,
      };
    }
    case ChipComboBoxAction.CLEAR_SELECTED_VALUE: {
      return {
        ...DEFAULT_COMBOBOX_STATE,
      };
    }
    case ChipComboBoxAction.SEARCH_VALUE: {
      return {
        ...state,
        inputValue: action.value ?? "",
      };
    }
    case ChipComboBoxAction.ARROW_UP: {
      return {
        ...state,
        keyboardSelectedIndex: Math.max(state.keyboardSelectedIndex - 1, 0),
      };
    }
    case ChipComboBoxAction.ARROW_DOWN: {
      return {
        ...state,
        keyboardSelectedIndex: Math.min(
          state.keyboardSelectedIndex + 1,
          Number(action.value)
        ),
      };
    }
  }
};

const Combobox = ({
  data,
  onSelectedAction,
  className,
  placeholder,
  activeValue,
  allowNoValue,
}: ComboboxProperties) => {
  const [comboBoxState, dispatchState] = useReducer(reducer, {
    ...DEFAULT_COMBOBOX_STATE,
    selectedValue: activeValue,
  });
  const [selectionData, setSelectionData] = useState(data);

  const reference = useRef<HTMLDivElement>(null);

  const handleClickForDropdown = (event: MouseEvent) => {
    if (
      comboBoxState.isDropDownOpen &&
      reference.current &&
      !reference.current.contains(event.target as Node)
    ) {
      clearState();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickForDropdown);

    return () => {
      document.removeEventListener("click", handleClickForDropdown);
    };
  }, [comboBoxState.isDropDownOpen]);

  const onSelectUnit = (unit: string): void => {
    dispatchState({
      type: ChipComboBoxAction.SET_SELECTED_VALUE,
      value: unit,
    });
    onSelectedAction(unit ?? "");
  };

  const clearState = () => {
    dispatchState({ type: ChipComboBoxAction.CLEAR_SELECTED_VALUE });
    onSelectedAction();
  };

  useEffect(() => {
    if (activeValue !== undefined) {
      dispatchState({
        type: ChipComboBoxAction.SET_SELECTED_VALUE,
        value: activeValue,
      });
      return;
    }
    dispatchState({
      type: ChipComboBoxAction.CLEAR_SELECTED_VALUE,
    });
  }, [activeValue]);

  useEffect(() => {
    setSelectionData(data);
  }, [data]);

  return (
    <div className="relative w-full h-full" ref={reference}>
      <div
        className={cn(
          "bg-white flex border border-gray-200 rounded items-center justify-between",
          className
        )}
      >
        <span
          className={cn("flex w-full mr-1 pr-1 justify-between", {
            "bg-gray-100 rounded-md h-7": comboBoxState.selectedValue,
          })}
        >
          {/* eslint-ignore-next-line jsx-a11y/click-events-have-key-events */}
          <input
            type="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatchState({
                type: ChipComboBoxAction.SEARCH_VALUE,
                value: event.target.value,
              });
            }}
            placeholder={placeholder ?? ""}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
              if (event.key === "Enter" && selectionData.length > 0) {
                onSelectUnit(
                  selectionData[comboBoxState.keyboardSelectedIndex]
                );
                event.stopPropagation();
              }
              if (event.key === "ArrowDown") {
                dispatchState({
                  type: ChipComboBoxAction.ARROW_DOWN,
                  value: selectionData.length.toString(),
                });
              }
              if (event.key === "ArrowUp") {
                dispatchState({ type: ChipComboBoxAction.ARROW_UP });
              }
            }}
            value={comboBoxState.selectedValue || comboBoxState.inputValue}
            onClick={(event) => {
              dispatchState({ type: ChipComboBoxAction.OPEN_DROPDOWN });
              event.stopPropagation();
            }}
            disabled={!!comboBoxState.selectedValue}
            className={cn(
              "pl-2 bg-inherit rounded-md h-7 appearance-none outline-none w-full",
              comboBoxState.selectedValue
                ? "text-black cursor-pointer"
                : "text-gray-500"
            )}
          />
          {comboBoxState.selectedValue && allowNoValue && (
            <button
              type="button"
              className="flex w-6 h-auto items-center"
              onClick={() => {
                clearState();
              }}
            >
              <XMarkIcon className="hover:cursor-pointer" />
            </button>
          )}
        </span>

        <button
          className="cursor-pointer outline-none w-6 focus:outline-none border-gray-200 transition-all text-gray-300 hover:text-gray-600"
          data-testid={`combobox-${
            comboBoxState.isDropDownOpen ? "close" : "open"
          }-dropdown`}
          tabIndex={0}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            if (comboBoxState.isDropDownOpen) {
              dispatchState({ type: ChipComboBoxAction.CLOSE_DROPDOWN });
              return;
            }
            dispatchState({ type: ChipComboBoxAction.OPEN_DROPDOWN });
          }}
        >
          {comboBoxState.isDropDownOpen && (
            <ChevronUpIcon className="w-full h-auto" />
          )}
          {!comboBoxState.isDropDownOpen && (
            <ChevronDownIcon className="w-full h-auto" />
          )}
        </button>
      </div>

      {comboBoxState.isDropDownOpen && (
        <div
          className="absolute rounded shadow bg-white overflow-x-hidden visible flex-col w-full mt-1 border border-gray-200 z-10 h-96 overflow-y-scroll"
          role="menu"
          tabIndex={0}
        >
          {selectionData.map((unit, index) => (
            /* eslint-ignore-next-line jsx-a11y/click-events-have-key-events */
            <div
              className="cursor-pointer group border-t"
              key={unit + index}
              role="listbox"
              tabIndex={0}
              onClick={() => {
                onSelectUnit(unit);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSelectUnit(unit);
                }
              }}
            >
              <p
                className={cn(
                  "block p-2 border-transparent border-l-4 group-hover:bg-gray-100",
                  {
                    "border-l-black": comboBoxState.selectedValue === unit,
                    "bg-gray-100":
                      index === comboBoxState.keyboardSelectedIndex,
                  }
                )}
              >
                {unit}
              </p>
            </div>
          ))}
          {selectionData.length === 0 && (
            <div className="cursor-pointer group border-t">
              <p className="block p-2 border-transparent border-l-4">
                No results...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Combobox);
