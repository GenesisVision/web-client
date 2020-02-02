import "./style.scss";

import classNames from "classnames";
import { GvInput, IPropsGvInput } from "components/gv-input/gv-input";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect, useRef } from "react";

import GVTextArea from "./gv-text-area";

const _GVTextField: React.FC<GVTextFieldProps> = props => {
  const {
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
      setImmediate(() => {
        input.current!.focus && input.current!.focus();
      });
    }
  }, [autoFocus, input.current]);

  const renderInput = () => {
    const Input: React.ComponentType<any> | string =
      type === "textarea" ? GVTextArea : InputComponent;

    return (
      <Input
        ref={input}
        type={type}
        className={classNames("gv-text-field__input", inputClassName)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
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
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  InputComponent?: React.ComponentType<any> | string;
  inputClassName?: string;
  onBlur?: (e: any) => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  form?: any;
  autoFocus?: boolean;
}

const GVTextField = React.memo(_GVTextField);
export default GVTextField;
