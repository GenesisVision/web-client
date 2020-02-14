import "./style.scss";

import classNames from "classnames";
import React from "react";

class GVSwitch extends React.PureComponent<GVSwitchProps> {
  static propTypes: any;
  static defaultProps: any;
  checkbox: React.RefObject<HTMLInputElement>;

  constructor(props: GVSwitchProps) {
    super(props);
    this.checkbox = React.createRef();
  }

  handleClick = (e: any) => {
    if (this.checkbox.current !== null) {
      e.stopPropagation();
      this.checkbox.current.click();
    }
  };

  handleInputClick = (e: any) => {
    e.stopPropagation();
  };

  renderError = () => {
    const { touched, error } = this.props;
    if (!touched || !error) return null;

    return <span className="gv-switch__error">{error}</span>;
  };

  render() {
    const {
      name,
      className,
      color,
      value,
      label,
      touched,
      disabled,
      ...other
    } = this.props;
    return (
      <span className="gv-switch-wrapper">
        {label && (
          <span className="gv-switch__label" onClick={this.handleClick}>
            {label}
          </span>
        )}
        <span
          className={classNames("gv-switch", className, {
            "gv-switch--checked": value,
            "gv-switch--primary": color === "primary",
            "gv-switch--secondary": color === "secondary",
            "gv-switch--disabled": disabled
          })}
          onClick={this.handleClick}
        >
          <span className="gv-switch__input-wrapper">
            <span className="gv-switch__handler" />
            <input
              ref={this.checkbox}
              type="checkbox"
              name={name}
              className="gv-switch__input"
              checked={value}
              onClick={this.handleInputClick}
              disabled={disabled}
              {...other}
            />
          </span>
          <span className="gv-switch__track" />
        </span>
        {this.renderError()}
      </span>
    );
  }
}

export default GVSwitch;

interface GVSwitchProps {
  name?: string;
  checked?: boolean;
  color?: string;
  className?: string;
  touched: boolean;
  value: boolean;
  error?: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
}
