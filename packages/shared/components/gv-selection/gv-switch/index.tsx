import classnames from "classnames";
import React from "react";

interface GVSwitchProps {
  name: string;
  checked?: boolean;
  color?: string;
  className?: string;
  touched: boolean;
  value: boolean;
  error?: string;
  label?: string;
  disabled?: boolean;
}

class GVSwitch extends React.Component<GVSwitchProps> {
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

  renderLabel = () => {
    const { label } = this.props;
    if (!label) return null;

    return (
      <span className="gv-switch-label" onClick={this.handleClick}>
        {label}
      </span>
    );
  };

  renderError = () => {
    const { touched, error } = this.props;
    if (!touched || !error) return null;

    return <span className="gv-switch-error">{error}</span>;
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
      <span className="gv-switch-wrapper">
        {this.renderLabel()}
        <span
          className={classnames("gv-switch", className, {
            "gv-switch-checked": value,
            "gv-switch-primary": color === "primary",
            "gv-switch-secondary": color === "secondary",
            "gv-switch-disabled": disabled
          })}
          onClick={this.handleClick}
        >
          <span className="gv-switch-input-wrapper">
            <span className="gv-switch-handler" />
            <input
              ref={this.checkbox}
              type="checkbox"
              name={name}
              className="gv-switch-input"
              checked={value}
              onClick={this.handleInputClick}
              disabled={disabled}
              {...other}
            />
          </span>
          <span className="gv-switch-track" />
        </span>
        {this.renderError()}
      </span>
    );
  }
}

export default GVSwitch;
