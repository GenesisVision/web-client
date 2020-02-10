import "./gv-checkbox.scss";

import classNames from "classnames";
import * as React from "react";
import { useCallback, useRef } from "react";

const _GVCheckbox: React.FC<IGVCheckboxProps> = ({
  touched,
  error,
  name,
  className,
  color,
  value,
  label,
  disabled,
  ...other
}) => {
  const checkbox = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      if (checkbox.current !== null) {
        e.stopPropagation();
        checkbox.current.click();
      }
    },
    [checkbox.current]
  );

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );

  return (
    <span className="gv-checkbox-wrapper">
      <span
        className={classNames("gv-checkbox", className, {
          "gv-checkbox--checked": value,
          "gv-checkbox--primary": color === "primary",
          "gv-checkbox--secondary": color === "secondary",
          "gv-checkbox--disabled": disabled
        })}
        onClick={handleClick}
      >
        <span className="gv-checkbox__input-wrapper">
          <span className={"gv-checkbox__handler"}>
            {value ? "✔" : "&nbsp;"}
          </span>
          <input
            ref={checkbox}
            type="checkbox"
            name={name}
            className={classNames("gv-checkbox__input")}
            checked={value}
            onClick={handleInputClick}
            disabled={disabled}
            {...other}
          />
        </span>
        <span className={"gv-checkbox__track"} />
      </span>
      {label && (
        <span className={"gv-checkbox__label"} onClick={handleClick}>
          {label}
        </span>
      )}
      {error && <span className={"gv-checkbox__error"}>{error}</span>}
    </span>
  );
};

interface IGVCheckboxProps {
  name: string;
  className?: string;
  color: string;
  value: any;
  touched: boolean;
  disabled: boolean;
  error: any;
  label: string;
}

const GVCheckbox = React.memo(_GVCheckbox);
export default GVCheckbox;
