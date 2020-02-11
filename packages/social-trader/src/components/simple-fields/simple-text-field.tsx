import "./simple-text-field.scss";

import classNames from "classnames";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useRef } from "react";

const _SimpleTextField: React.FC<ISimpleTextFieldProps> = props => {
  const {
    onChange,
    name,
    errorClassName,
    adornment,
    adornmentPosition,
    adornmentClassName,
    InputComponent,
    refProp,
    type,
    inputClassName,
    label,
    labelClassName,
    wrapperClassName,
    noMargin,
    wide,
    className,
    disabled,
    touched,
    error,
    onBlur,
    ...otherProps
  } = props;
  const input = useRef(null);

  const [focused, setFocused, setBlur] = useIsOpen();
  const handleBlur = useCallback((e: any) => {
    setBlur();
    onBlur && onBlur(e);
  }, []);
  return (
    <div
      className={classNames("simple-text-field__wrapper", wrapperClassName, {
        "simple-text-field__wrapper--no-margin": noMargin,
        "simple-text-field__wrapper--wide": wide
      })}
    >
      <label
        className={classNames("simple-text-field__label", labelClassName, {
          "simple-text-field__label--shrink":
            focused ||
            adornment ||
            (input.current &&
              // @ts-ignore
              input.current.state.value !== undefined &&
              // @ts-ignore
              input.current.state.value !== "")
        })}
      >
        {label}
      </label>
      <div
        className={classNames("simple-text-field", className, {
          "simple-text-field--disabled": disabled,
          "simple-text-field--invalid": touched && error,
          "simple-text-field--focused": focused
        })}
      >
        {InputComponent && (
          <InputComponent
            onValueChange={onChange}
            name={name}
            ref={input}
            type={type}
            className={classNames("simple-text-field__input", inputClassName)}
            onFocus={setFocused}
            onBlur={handleBlur}
            {...otherProps}
          />
        )}
        {adornment && (
          <div
            className={classNames(
              "simple-text-field__adornment",
              adornmentClassName,
              {
                "simple-text-field__adornment--start":
                  adornmentPosition === "start",
                "simple-text-field__adornment--end": adornmentPosition === "end"
              }
            )}
          >
            {adornment}
          </div>
        )}
      </div>
      {touched && error && (
        <div className={classNames("simple-text-field__error", errorClassName)}>
          {error}
        </div>
      )}
    </div>
  );
};

export interface ISimpleTextFieldProps {
  onChange?: (e: any) => void;
  name: string;
  adornment?: React.ReactNode;
  adornmentPosition?: "start" | "end";
  InputComponent?: React.ComponentType<any> | string;
  refProp: any;
  type?: string;
  label?: string;
  value?: string | number;
  noMargin?: boolean;
  wide?: boolean;
  disabled?: boolean;
  touched?: boolean;
  error?: string;
  onBlur?: (e: any) => void;
  className?: string;
  wrapperClassName?: string;
  errorClassName?: string;
  adornmentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  [key: string]: any;
}

export const SimpleTextField = React.memo(_SimpleTextField);
