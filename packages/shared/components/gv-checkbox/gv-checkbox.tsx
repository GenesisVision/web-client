import "./gv-checkbox.scss";

import classNames from "classnames";
import * as React from "react";
import { RefObject } from "react";

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

class GVCheckbox extends React.PureComponent<IGVCheckboxProps> {
  checkbox: RefObject<HTMLInputElement> = React.createRef();

  handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (this.checkbox.current !== null) {
      e.stopPropagation();
      this.checkbox.current.click();
    }
  };

  handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
  };

  renderLabel = (): React.ReactNode => {
    const { label } = this.props;
    if (!label) return null;

    return (
      <span className={"gv-checkbox__label"} onClick={this.handleClick}>
        {label}
      </span>
    );
  };

  renderError = (): React.ReactNode => {
    const { touched, error } = this.props;
    if (!touched || !error) return null;

    return <span className={"gv-checkbox__error"}>{error}</span>;
  };

  render() {
    const {
      name,
      className,
      color,
      value,
      touched,
      disabled,
      ...other
    } = this.props;
    return (
      <span className={"gv-checkbox-wrapper"}>
        <span
          className={classNames("gv-checkbox", className, {
            "gv-checkbox--checked": value,
            "gv-checkbox--primary": color === "primary",
            "gv-checkbox--secondary": color === "secondary",
            "gv-checkbox--disabled": disabled
          })}
          onClick={this.handleClick}
        >
          <span className={"gv-checkbox__input-wrapper"}>
            <span className={"gv-checkbox__handler"}>
              {value ? "✔" : "&nbsp;"}
            </span>
            <input
              ref={this.checkbox}
              type="checkbox"
              name={name}
              className={classNames("gv-checkbox__input")}
              checked={value}
              onClick={this.handleInputClick}
              disabled={disabled}
              {...other}
            />
          </span>
          <span className={"gv-checkbox__track"} />
        </span>
        {this.renderLabel()}
        {this.renderError()}
      </span>
    );
  }
}

export default GVCheckbox;
