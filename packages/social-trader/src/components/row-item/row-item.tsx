import clsx from "clsx";
import React from "react";
import { Sizeable } from "utils/types";

import styles from "./row-item.module.scss";

export interface IRowItemProps extends Sizeable {
  hide?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  wide?: boolean;
  bottomOffset?: boolean;
  className?: string;
}

export const RowItem: React.FC<IRowItemProps> = ({
  size = "middle",
  hide,
  wide,
  onClick,
  bottomOffset,
  className,
  children
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(styles["row-item"], className, {
        [styles["row-item--pointer"]]: !!onClick,
        [styles["row-item--hide"]]: hide,
        [styles["row-item--wide"]]: wide,
        [styles["row-item--bottom-offset"]]: bottomOffset,
        [styles["row-item--xsmall"]]: size === "xsmall",
        [styles["row-item--small"]]: size === "small",
        [styles["row-item--middle"]]: size === "middle",
        [styles["row-item--xlarge"]]: size === "xlarge",
        [styles["row-item--large"]]: size === "large"
      })}
    >
      {children}
    </div>
  );
};
