import clsx from "clsx";
import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React from "react";

import styles from "./style.module.scss";

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
        <span className={styles["gv-switch__error"]}>{error}</span>
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
      <Center className={styles["gv-switch-wrapper"]}>
        {label && (
          <RowItem
            size={"small"}
            className={styles["gv-switch__label"]}
            onClick={this.handleClick}
          >
            <Text muted size={"large"}>
              {label}
            </Text>
          </RowItem>
        )}
        <RowItem>
          <span
            className={clsx(styles["gv-switch"], className, {
              [styles["gv-switch--checked"]]: value,
              [styles["gv-switch--primary"]]: color === "primary",
              [styles["gv-switch--secondary"]]: color === "secondary",
              [styles["gv-switch--disabled"]]: disabled
            })}
            onClick={this.handleClick}
          >
            <span className={styles["gv-switch__input-wrapper"]}>
              <span className={styles["gv-switch__handler"]} />
              <input
                ref={this.checkbox}
                type="checkbox"
                name={name}
                className={styles["gv-switch__input"]}
                checked={value}
                onClick={this.handleInputClick}
                disabled={disabled}
                {...other}
              />
            </span>
            <span className={styles["gv-switch__track"]} />
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
