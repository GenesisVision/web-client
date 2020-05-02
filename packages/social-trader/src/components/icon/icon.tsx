import classNames from "classnames";
import * as React from "react";

import styles from "./icon.module.scss";

export interface IIconProps {
  type?: string;
  primary?: boolean;
  secondary?: boolean;
  rotate?: boolean;
  selected?: boolean;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

export const Icon: React.FC<IIconProps> = ({
  type,
  className,
  onClick,
  primary,
  secondary,
  children,
  rotate,
  selected
}) => {
  return (
    <span
      className={classNames(
        styles["icon"],
        styles[`icon--${type}`],
        className,
        {
          [styles["icon--primary"]]: primary,
          [styles["icon--secondary"]]: secondary,
          [styles["icon--rotate"]]: rotate,
          [styles["icon--selected"]]: selected
        }
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
