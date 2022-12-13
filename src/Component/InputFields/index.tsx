import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ICONS } from "../../assets/icons";
import { RefType, StateType } from "../../types";
import { InputStatus_TYPE } from "./helper.types";
import "./index.css";

const DEFAULT_BORDER_COLOR = "border-grayscale-400";
const ON_FOCUS_BORDER_COLOR = "border-blue-100";
const ACTIVE_BORDER_COLOR = "border-grayscale-500";
const INACTIVE_BORDER_COLOR = "border-grayscale-300";
const ERROR_BORDER_COLOR = "border-feedback-error";

const PLACEHOLDER_FONT_COLOR_DISABLED = "placeholder:text-grayscale-400";
const PLACEHOLDER_FONT_COLOR_DEFAULT = "placeholder:text-grayscale-500";
const PLACEHOLDER_FONT_COLOR_ACTIVE = "placeholder:text-grayscale-300";

type Props = {
  className?: string;
  name: string;
  placeholder: string;
  defaultValue?: string | undefined;
  disabled?: boolean;
  onBlur?: (
    event: React.ChangeEvent<HTMLInputElement>,
    inputFiledEdited: boolean
  ) => void | undefined;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    inputFiledEdited: boolean
  ) => void | undefined;
  onFocus?: (
    event: React.ChangeEvent<HTMLInputElement>,
    inputFiledEdited: boolean
  ) => void | undefined;
  status?: InputStatus_TYPE;
  value?: string | undefined;
  prefixElement?: ReactElement | undefined;
  suffixElement?: ReactElement | undefined;
};

function TextInput({
  className = "",
  name,
  placeholder,
  defaultValue,
  disabled = false,
  onBlur = (_) => {},
  onChange = (_) => {},
  onFocus = (_) => {},
  status = {
    status: "DEFAULT",
    message: null,
  },
  value,
  prefixElement,
  suffixElement,
}: Props) {
  const [_value, setValue]: StateType<string> = useState<string>("");

  const inputWrapperElementRef: RefType<null | HTMLDivElement> = useRef(null);
  const inputElementRef: RefType<null | HTMLInputElement> = useRef(null);
  const isInputEdited: RefType<boolean> = useRef(false);
  const isElementFocused: RefType<boolean> = useRef(false);

  const inputWrapperElementClassList: DOMTokenList =
    inputWrapperElementRef.current!.classList;
  const inputElementClassList: DOMTokenList =
    inputElementRef.current!.classList;

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setValue(value);
    }
  }, [value]);

  useEffect(() => {
    inputFieldBehavior();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputFieldBehavior();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const borderClassesToBeRemoved = (borderClass: string): string[] => {
    const borderColorClasses = [
      DEFAULT_BORDER_COLOR,
      ON_FOCUS_BORDER_COLOR,
      ACTIVE_BORDER_COLOR,
      INACTIVE_BORDER_COLOR,
      ERROR_BORDER_COLOR,
    ];

    const indexOfBorderClass = borderColorClasses.indexOf(borderClass);

    const result = borderColorClasses.splice(indexOfBorderClass, 1);

    return result;
  };

  const changeBorderColorToError = () => {
    const ALREADY_CONTAINS_CLASS =
      inputWrapperElementClassList.contains(ERROR_BORDER_COLOR);

    if (ALREADY_CONTAINS_CLASS === true) return;

    inputWrapperElementClassList.add(ERROR_BORDER_COLOR);
    inputWrapperElementClassList.remove(
      ...borderClassesToBeRemoved(ERROR_BORDER_COLOR)
    );
  };

  const changeBorderColorToDefault = () => {
    const ALREADY_CONTAINS_CLASS =
      inputWrapperElementClassList.contains(DEFAULT_BORDER_COLOR);

    if (ALREADY_CONTAINS_CLASS === true) return;

    inputWrapperElementClassList.add(DEFAULT_BORDER_COLOR);
    inputWrapperElementClassList.remove(
      ...borderClassesToBeRemoved(DEFAULT_BORDER_COLOR)
    );
    inputElementClassList.add(PLACEHOLDER_FONT_COLOR_DEFAULT);
    inputElementClassList.remove(
      PLACEHOLDER_FONT_COLOR_ACTIVE,
      PLACEHOLDER_FONT_COLOR_DISABLED
    );
  };

  const changeBorderColorToFocused = () => {
    const ALREADY_CONTAINS_CLASS = inputWrapperElementClassList.contains(
      ON_FOCUS_BORDER_COLOR
    );

    if (ALREADY_CONTAINS_CLASS === true) return;

    inputWrapperElementClassList.add(ON_FOCUS_BORDER_COLOR);
    inputWrapperElementClassList.remove(
      ...borderClassesToBeRemoved(ON_FOCUS_BORDER_COLOR)
    );
    inputElementClassList.add(PLACEHOLDER_FONT_COLOR_ACTIVE);
    inputElementClassList.remove(
      PLACEHOLDER_FONT_COLOR_DEFAULT,
      PLACEHOLDER_FONT_COLOR_DISABLED
    );
  };

  const changeBorderColorToActive = () => {
    const ALREADY_CONTAINS_CLASS =
      inputWrapperElementClassList.contains(ACTIVE_BORDER_COLOR);

    if (ALREADY_CONTAINS_CLASS === true) return;

    inputWrapperElementClassList.add(ACTIVE_BORDER_COLOR);
    inputWrapperElementClassList.remove(
      ...borderClassesToBeRemoved(ACTIVE_BORDER_COLOR)
    );
    inputElementClassList.add(PLACEHOLDER_FONT_COLOR_ACTIVE);
    inputElementClassList.remove(
      PLACEHOLDER_FONT_COLOR_DEFAULT,
      PLACEHOLDER_FONT_COLOR_DISABLED
    );
  };

  const changeBorderColorToDisabled = () => {
    const ALREADY_CONTAINS_CLASS =
      inputWrapperElementClassList.contains(ACTIVE_BORDER_COLOR);

    if (ALREADY_CONTAINS_CLASS === true) return;

    inputWrapperElementClassList.add(INACTIVE_BORDER_COLOR);
    inputWrapperElementClassList.remove(
      ...borderClassesToBeRemoved(INACTIVE_BORDER_COLOR)
    );
    inputElementClassList.add(PLACEHOLDER_FONT_COLOR_DISABLED);
    inputElementClassList.remove(
      PLACEHOLDER_FONT_COLOR_DEFAULT,
      PLACEHOLDER_FONT_COLOR_ACTIVE
    );
  };

  const inputFieldBehaviorOnFocus = () => {
    if (!inputWrapperElementClassList || !inputElementClassList) return;

    const INPUT_FILED_ERROR: boolean = status.status === "ERROR" ? true : false;

    if (INPUT_FILED_ERROR === true) {
      changeBorderColorToError();
      return;
    }

    changeBorderColorToFocused();
  };

  const inputFieldBehaviorOnChange = () => {
    if (!inputWrapperElementClassList || !inputElementClassList) return;

    const INPUT_FILED_ERROR: boolean = status.status === "ERROR" ? true : false;
    if (INPUT_FILED_ERROR === true) {
      changeBorderColorToError();
      return;
    }

    changeBorderColorToActive();
  };

  const inputFieldBehaviorOnBlur = () => {
    if (!inputWrapperElementClassList || !inputElementClassList) return;

    const INPUT_FILED_ERROR: boolean = status.status === "ERROR" ? true : false;

    if (INPUT_FILED_ERROR === true) {
      changeBorderColorToError();
      return;
    }

    const INPUT_FIELD_EDITED: boolean = isInputEdited.current;
    const INPUT_FIELD_HAS_VALUE: boolean = _value.length > 0;

    if (INPUT_FIELD_EDITED === true && INPUT_FIELD_HAS_VALUE === true) {
      changeBorderColorToActive();
      return;
    }

    changeBorderColorToDefault();
  };

  const inputFieldBehavior = () => {
    if (!inputWrapperElementClassList || !inputElementClassList) return;

    const INPUT_FILED_ERROR: boolean = status.status === "ERROR" ? true : false;
    const IS_ELEMENT_FOCUSED: boolean = isElementFocused.current;
    const INPUT_FIELD_EDITED: boolean = isInputEdited.current;
    const INPUT_FIELD_HAS_VALUE: boolean = _value.length > 0;

    if (disabled === true) {
      changeBorderColorToDisabled();
    } else if (INPUT_FILED_ERROR === true) {
      changeBorderColorToError();
    } else if (IS_ELEMENT_FOCUSED === true) {
      changeBorderColorToFocused();
    } else if (INPUT_FIELD_EDITED === true && INPUT_FIELD_HAS_VALUE === true) {
      changeBorderColorToActive();
    }
  };

  const _onFocus = (event: React.ChangeEvent<HTMLInputElement>): void => {
    isElementFocused.current = true;
    inputFieldBehaviorOnFocus();
    onFocus(event, isInputEdited.current);
  };

  const _onBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
    isElementFocused.current = false;
    inputFieldBehaviorOnBlur();
    onBlur(event, isInputEdited.current);
  };

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    isInputEdited.current = true;
    setValue(event.target.value);
    onChange(event, isInputEdited.current);
    inputFieldBehaviorOnChange();
  };

  const enableFocusForEntireElement = (): void => {
    inputElementRef.current?.focus();
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="m-0 mb-2 text-grayscale-900 text-[10px] font-medium ">
          Label
        </p>
        <div
          ref={inputWrapperElementRef}
          className=" pt-2 pb-2 pl-3 pr-3 border border-grayscale-400 rounded-lg flex justify-between items-center flex-row "
          onClick={enableFocusForEntireElement}
        >
          {prefixElement && <div>{prefixElement}</div>}
          <input
            className={`pl-1 pr-1 outline-none rounded-lg placeholder:text-grayscale-500
          caret-blue-100 text-grayscale-900 text-xs font-medium ${className}`}
            name={name}
            onBlur={_onBlur}
            onChange={_onChange}
            onFocus={_onFocus}
            placeholder={placeholder}
            ref={inputElementRef}
            title="name"
            value={_value}
          />
          <div>
            <img src={ICONS.danger} alt="" />
          </div>

          {suffixElement && <div>{suffixElement}</div>}
          {suffixElement && status.status === "ERROR" && (
            <div>
              <img src={ICONS.danger} alt="" className="h-3 w-3" />
            </div>
          )}
        </div>
        <p className="m-0 mt-2 text-red-500 text-[8px] ">Error Message</p>
      </div>
    </>
  );
}

export default TextInput;

// useEffect(() => {
//   if (value !== undefined) {
//     setValue(value);
//   } else {
//     setValue("");
//   }
// }, [value]);

// const _onFocus = (event: React.ChangeEvent<HTMLInputElement>): void => {
//   changeInputBorderColor(status.status === "ERROR" ? "ERROR" : "ON-FOCUS");
//   onFocus(event);
// };

// const _onBlur = (event: React.ChangeEvent<HTMLInputElement>): void => {
//   const IS_INPUT_FIELD_CHANGED: boolean = isInputEdited.current;
//   if (status.status === "ERROR") {
//     changeInputBorderColor("ERROR");
//   } else if (IS_INPUT_FIELD_CHANGED === true) {
//     changeInputBorderColor("ON-BLUR-EDITED");
//   } else {
//     changeInputBorderColor("ON-BLUR");
//   }
//   onBlur(event);
// };

// const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   isInputEdited.current = true;
//   setValue(event.target.value);
//   onChange(event);
//   // const INPUT_ELEMENT_ALREADY_FOCUSED = parentNodeRef.current!.classList.contains("ON-FOCUS");

//   const ALREADY_CONTAINS_ERROR_CLASS =
//     parentNodeRef.current!.classList.contains("ERROR");

//   if (status.status === "ERROR" && ALREADY_CONTAINS_ERROR_CLASS === false) {
//     changeInputBorderColor("ERROR");
//   }
// };
