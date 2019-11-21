import "./chip.scss";

import classNames from "classnames";
import * as React from "react";

const Chip: React.FC<Props> = React.memo(
  ({ type, children, rounded, onClick, className, disabled }) => (
    <div
      className={classNames("chip", className, {
        [`chip--${type}`]: type,
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

export enum CHIP_TYPE {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  WARNING = "warning"
}

interface Props {
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
  onClick?(event: React.MouseEvent<HTMLElement>): void | undefined;
}

export default Chip;
