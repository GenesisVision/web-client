import classNames from "classnames";
import Chip, { CHIP_TYPE } from "components/chip/chip";
import * as React from "react";
import { ReactNode } from "react";
import { SizesType } from "utils/types";

import styles from "./chip.module.scss";

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
      className={classNames(styles["chip-button"], {
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

interface Props {
  stretch?: boolean;
  reverseOrder?: boolean;
  size?: SizesType;
  label?: string | JSX.Element;
  chipLabel?: string | number | ReactNode;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void | undefined;
}

export default ChipButton;
