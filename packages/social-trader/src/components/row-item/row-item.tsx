import clsx from "clsx";
import { IRowItemProps } from "components/row-item/row-item.types";
import React from "react";

import styles from "./row-item.module.scss";

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
