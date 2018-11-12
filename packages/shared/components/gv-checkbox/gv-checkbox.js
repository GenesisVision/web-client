import "./gv-checkbox.scss";

import classnames from "classnames";
import React, { Component } from "react";

class GVCheckbox extends Component {
  checkbox;

  constructor(props) {
    super(props);
    this.checkbox = React.createRef();
  }

  handleClick = e => {
    if (this.checkbox.current !== null) {
      e.stopPropagation();
      this.checkbox.current.click();
    }
  };

  handleInputClick = e => {
    e.stopPropagation();
  };

  renderLabel = () => {
    const { label } = this.props;
    if (!label) return null;

    return (
      <span className={"gv-checkbox__label"} onClick={this.handleClick}>
        {label}
      </span>
    );
  };

  renderError = () => {
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
          className={classnames("gv-checkbox", className, {
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
              className={classnames("gv-checkbox__input")}
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
