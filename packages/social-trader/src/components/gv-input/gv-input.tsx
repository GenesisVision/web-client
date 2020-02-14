import "./gv-input.scss";

import classNames from "classnames";
import React from "react";

const _GvInput: React.FC<Props> = ({
  correct,
  wrapperClassName,
  noMargin,
  wide,
  label,
  labelClassName,
  focused,
  adornment,
  value,
  className,
  disabled,
  touched,
  error,
  inputElement,
  adornmentClassName,
  adornmentPosition,
  errorClassName
}) => {
  return (
    <div
      className={classNames("gv-input__wrapper", wrapperClassName, {
        "gv-input__wrapper--no-margin": noMargin,
        "gv-input__wrapper--wide": wide
      })}
    >
      {label && (
        <label
          className={classNames("gv-input__label", labelClassName, {
            "gv-input__label--shrink":
              focused || adornment || (value !== undefined && value !== "")
          })}
        >
          {label}
        </label>
      )}
      <div
        className={classNames("gv-input", className, {
          "gv-input--correct": correct,
          "gv-input--disabled": disabled,
          "gv-input--invalid": touched && error,
          "gv-input--focused": focused
        })}
      >
        {inputElement}
        {adornment && (
          <div
            className={classNames("gv-input__adornment", adornmentClassName, {
              "gv-input__adornment--start": adornmentPosition === "start",
              "gv-input__adornment--end": adornmentPosition === "end"
            })}
          >
            {adornment}
          </div>
        )}
      </div>
      {touched && error && (
        <div className={classNames("gv-input__error", errorClassName)}>
          {error}
        </div>
      )}
    </div>
  );
};

interface Props extends IPropsGvInput {
  inputElement: JSX.Element;
}

export interface IPropsGvInput {
  correct?: boolean;
  adornment?: React.ReactNode;
  label?: string | React.ReactNode;
  value?: string | number;
  error?: string;
  adornmentPosition?: "start" | "end";
  wrapperClassName?: string;
  adornmentClassName?: string;
  labelClassName?: string;
  className?: string;
  errorClassName?: string;
  noMargin?: boolean;
  wide?: boolean;
  focused?: boolean;
  disabled?: boolean;
  touched?: boolean;
}

export const GvInput = React.memo(_GvInput);
