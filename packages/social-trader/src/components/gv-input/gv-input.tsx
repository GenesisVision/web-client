import clsx from "clsx";
import { Text } from "components/text/text";
import React from "react";

import styles from "./gv-input.module.scss";

const _GvInput: React.FC<Props> = ({
  showError = true,
  bottomLine = true,
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
      className={clsx(styles["gv-input__wrapper"], wrapperClassName, {
        [styles["gv-input__wrapper--no-margin"]]: noMargin,
        [styles["gv-input__wrapper--wide"]]: wide
      })}
    >
      {label && (
        <label
          className={clsx(styles["gv-input__label"], labelClassName, {
            [styles["gv-input__label--shrink"]]:
              focused || adornment || (value !== undefined && value !== "")
          })}
        >
          <Text muted size={"large"}>
            {label}
          </Text>
        </label>
      )}
      <div
        className={clsx(styles["gv-input"], className, {
          [styles["gv-input--top-offset"]]: !!label,
          [styles["gv-input--bottom-line"]]: bottomLine,
          [styles["gv-input--correct"]]: correct,
          [styles["gv-input--disabled"]]: disabled,
          [styles["gv-input--invalid"]]: touched && error,
          [styles["gv-input--focused"]]: focused
        })}
      >
        {inputElement}
        {adornment && (
          <div
            className={clsx(styles["gv-input__adornment"], adornmentClassName, {
              [styles["gv-input__adornment--start"]]:
                adornmentPosition === "start",
              [styles["gv-input__adornment--end"]]: adornmentPosition === "end"
            })}
          >
            {adornment}
          </div>
        )}
      </div>
      {showError && touched && error && (
        <div className={clsx(styles["gv-input__error"], errorClassName)}>
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
  onPaste?: VoidFunction;
  onFocus?: VoidFunction;
  showError?: boolean;
  ref?: any;
  onKeyDown?: (e: any) => any;
  bottomLine?: boolean;
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
