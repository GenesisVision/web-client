import clsx from "clsx";
import Chip, { CHIP_TYPE } from "components/chip/chip";
import * as React from "react";
import { ReactNode } from "react";
import { Clickable, Sizeable } from "utils/types";

import styles from "./chip.module.scss";

interface Props extends Sizeable, Clickable {
  stretch?: boolean;
  reverseOrder?: boolean;
  label?: string | JSX.Element;
  chipLabel?: string | number | ReactNode;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
}

const ChipButton: React.FC<Props> = React.memo(
  ({
    stretch,
    reverseOrder,
    size = "small",
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
      className={clsx(styles["chip-button"], {
        [styles["chip-button--reversed"]]: reverseOrder
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
      {label && <div className={styles["chip-button__label"]}>{label}</div>}
    </div>
  )
);

export default ChipButton;
