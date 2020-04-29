import classNames from "classnames";
import { GvInput, IPropsGvInput } from "components/gv-input/gv-input";
import useIsOpen from "hooks/is-open.hook";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { NumberFormatValues } from "react-number-format";

import GVTextArea from "./gv-text-area";
import "./style.scss";

const _GVTextField: React.FC<GVTextFieldProps> = props => {
  const {
    onFocus,
    adornmentPosition = "end",
    onBlur,
    autoFocus,
    type = "text",
    inputClassName,
    InputComponent = "input"
  } = props;
  const input = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [focused, setFocused, setNotFocused] = useIsOpen();

  const handleFocus = useCallback(() => {
    setFocused();
    if (onFocus) onFocus();
  }, []);

  const handleBlur = useCallback(
    (e: any) => {
      setNotFocused();
      if (onBlur) onBlur(e);
    },
    [onBlur]
  );

  useEffect(() => {
    if (autoFocus && input.current) {
      const focusInput = () => {
        input.current!.focus && input.current!.focus();
      };
      if (typeof setImmediate !== "undefined") setImmediate(focusInput);
      else focusInput();
    }
  }, [autoFocus, input.current]);

  const renderInput = () => {
    const Input: React.ComponentType<any> | string =
      type === "textarea" ? GVTextArea : InputComponent;

    return (
      <Input
        {...props}
        ref={input}
        type={type}
        className={classNames("gv-text-field", inputClassName)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  };

  return (
    <GvInput
      {...props}
      adornmentPosition={adornmentPosition}
      inputElement={renderInput()}
      focused={focused}
    />
  );
};

export interface GVTextFieldProps extends IPropsGvInput {
  fixedVertical?: boolean;
  children?: ReactNode;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  InputComponent?: React.ComponentType<any> | string;
  inputClassName?: string;
  onBlur?: (e: any) => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onValueChange?: (e: NumberFormatValues) => void;
  form?: any;
  autoFocus?: boolean;
}

const GVTextField = React.memo(_GVTextField);
export default GVTextField;
