import classNames from "classnames";
import * as React from "react";
import { SizesType } from "utils/types";

import styles from "./default.block.module.scss";

export interface IDefaultBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  light?: boolean;
  roundedBorder?: boolean;
  hoverable?: boolean;
  size?: SizesType;
  className?: string;
  wide?: boolean;
  solid?: boolean;
  bordered?: boolean;
  horizontalOffsets?: boolean;
  verticalOffsets?: boolean;
  table?: boolean;
}

export const DefaultBlock: React.FC<IDefaultBlockProps> = ({
  light,
  roundedBorder = true,
  hoverable,
  wide,
  solid,
  bordered,
  horizontalOffsets = true,
  verticalOffsets = true,
  size = "middle",
  table,
  children,
  className
}) => (
  <div
    className={classNames(styles["default-block"], className, {
      [styles["default-block--light"]]: light,
      [styles["default-block--rounded-border"]]: roundedBorder,
      [styles["default-block--hoverable"]]: hoverable,
      [styles["default-block--wide"]]: wide,
      [styles["default-block--solid"]]: solid,
      [styles["default-block--bordered"]]: bordered,
      [styles["default-block--horizontal-offsets"]]: horizontalOffsets,
      [styles["default-block--vertical-offsets"]]: verticalOffsets,
      [styles["default-block--small"]]: size === "small",
      [styles["default-block--middle"]]: size === "middle",
      [styles["default-block--large"]]: size === "large",
      [styles["default-block--xlarge"]]: size === "xlarge",
      [styles["default-block--table"]]: table
    })}
  >
    {children}
  </div>
);
