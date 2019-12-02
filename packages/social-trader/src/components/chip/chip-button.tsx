import "./chip.scss";

import classNames from "classnames";
import Chip, { CHIP_SIZE, CHIP_TYPE } from "components/chip/chip";
import * as React from "react";
import { ReactNode } from "react";

const ChipButton: React.FC<Props> = React.memo(
  ({
    stretch,
    reverseOrder,
    size = CHIP_SIZE.SMALL,
    type,
    children,
    rounded,
    onClick,
    className,
    disabled,
    label,
    chipLabel
  }) => (
    <div
      onClick={onClick}
      className={classNames("chip-button", {
        "chip-button--reversed": reverseOrder
      })}
    >
      <Chip
        type={type}
        disabled={disabled}
        rounded={rounded}
        size={size}
        stretch={stretch}
      >
        {chipLabel}
      </Chip>
      {label && <div className="chip-button__label">{label}</div>}
    </div>
  )
);

interface Props {
  stretch?: boolean;
  reverseOrder?: boolean;
  size?: CHIP_SIZE;
  label?: string | JSX.Element;
  chipLabel?: string | number | ReactNode;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void | undefined;
}

export default ChipButton;
