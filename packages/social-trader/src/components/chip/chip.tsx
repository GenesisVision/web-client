import classNames from "classnames";
import * as React from "react";

import styles from "./chip.module.scss";

export enum CHIP_TYPE {
  EMPTY = "empty",
  POSITIVE = "positive",
  NEGATIVE = "negative",
  WARNING = "warning"
}

export enum CHIP_SIZE {
  SMALL = "SMALL"
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
      className={classNames(styles["chip"], className, {
        [styles[`chip--${type}`]]: type,
        [styles["chip--small"]]: size === CHIP_SIZE.SMALL,
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
