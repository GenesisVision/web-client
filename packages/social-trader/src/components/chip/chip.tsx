import clsx from "clsx";
import * as React from "react";
import { Sizeable } from "utils/types";

import styles from "./chip.module.scss";

export enum CHIP_TYPE {
  EMPTY = "empty",
  POSITIVE = "positive",
  NEGATIVE = "negative",
  WARNING = "warning"
}

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
      className={clsx(styles["chip"], className, {
        [styles[`chip--${type}`]]: type,
        [styles["chip--small"]]: size === "small",
        [styles["chip--stretch"]]: stretch,
        [styles["chip--rounded"]]: rounded,
        [styles["chip--disabled"]]: disabled,
        [styles["chip--pointer"]]: !disabled && typeof onClick === "function"
      })}
      onClick={disabled ? () => {} : onClick}
    >
      <div className={styles["chip__content"]}>{children}</div>
    </div>
  )
);

interface Props extends Sizeable {
  stretch?: boolean;
  disabled?: boolean;
  className?: string;
  rounded?: boolean;
  type?: CHIP_TYPE;
  onClick?(event: React.MouseEvent<HTMLElement>): void | undefined;
}

export default Chip;
