import "./chip.scss";

import classNames from "classnames";
import * as React from "react";

const Chip: React.FC<Props> = React.memo(
  ({
    type,
    children,
    rounded,
    onClick,
    className,
    disabled,
    size,
    stretch
  }) => (
    <div
      className={classNames("chip", className, {
        [`chip--${type}`]: type,
        "chip--small": size === CHIP_SIZE.SMALL,
        "chip--stretch": stretch,
        "chip--rounded": rounded,
        "chip--disabled": disabled,
        "chip--pointer": !disabled && typeof onClick === "function"
      })}
      onClick={disabled ? () => {} : onClick}
    >
      <div className="chip__content">{children}</div>
    </div>
  )
);

export enum CHIP_SIZE {
  SMALL = "SMALL"
}

export enum CHIP_TYPE {
  EMPTY = "empty",
  POSITIVE = "positive",
  NEGATIVE = "negative",
  WARNING = "warning"
}

interface Props {
  stretch?: boolean;
  size?: CHIP_SIZE;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
  onClick?(event: React.MouseEvent<HTMLElement>): void | undefined;
}

export default Chip;
