import "./chip.scss";

import classNames from "classnames";
import * as React from "react";

export enum CHIP_TYPE {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  WARNING = "warning"
}
interface IChipProps {
  disabled?: boolean;
  // children: () => void | { [keys: string]: any } | JSX.Element;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
  onClick?(event: React.MouseEvent<HTMLElement>): void | undefined;
}
class Chip extends React.PureComponent<IChipProps> {
  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (typeof this.props.onClick === "function") {
      this.props.onClick(event);
    }
  };

  render() {
    const {
      type,
      children,
      rounded,
      onClick,
      className,
      disabled
    } = this.props;
    const clickHandle = disabled ? () => {} : onClick;
    return (
      <div
        className={classNames("chip", className, {
          [`chip--${type}`]: type,
          "chip--rounded": rounded,
          "chip--disabled": disabled,
          "chip--pointer": !disabled && typeof onClick === "function"
        })}
        onClick={clickHandle}
      >
        <div className="chip__content">{children}</div>
      </div>
    );
  }
}

export default Chip;
