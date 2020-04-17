import classNames from "classnames";
import { Center } from "components/center/center";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import React from "react";

import "./style.scss";

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

    return (
      <RowItem>
        <span className="gv-switch__error">{error}</span>
      </RowItem>
    );
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
      <Center className="gv-switch-wrapper">
        {label && (
          <RowItem
            small
            className="gv-switch__label"
            onClick={this.handleClick}
          >
            <MutedText big>{label}</MutedText>
          </RowItem>
        )}
        <RowItem>
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
        </RowItem>
        {this.renderError()}
      </Center>
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
