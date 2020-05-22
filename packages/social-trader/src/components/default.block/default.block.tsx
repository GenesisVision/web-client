import classNames from "classnames";
import { SIZES } from "constants/constants";
import * as React from "react";

import styles from "./default.block.module.scss";

export interface IDefaultBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  roundedBorder?: boolean;
  hoverable?: boolean;
  size?: SIZES;
  className?: string;
  wide?: boolean;
  solid?: boolean;
  bordered?: boolean;
  horizontalOffsets?: boolean;
  verticalOffsets?: boolean;
  table?: boolean;
}

export const DefaultBlock: React.FC<IDefaultBlockProps> = ({
  roundedBorder = true,
  hoverable,
  wide,
  solid,
  bordered,
  horizontalOffsets = true,
  verticalOffsets = true,
  size = SIZES.MIDDLE,
  table,
  children,
  className
}) => (
  <div
    className={classNames(styles["default-block"], className, {
      [styles["default-block--rounded-border"]]: roundedBorder,
      [styles["default-block--hoverable"]]: hoverable,
      [styles["default-block--wide"]]: wide,
      [styles["default-block--solid"]]: solid,
      [styles["default-block--bordered"]]: bordered,
      [styles["default-block--horizontal-offsets"]]: horizontalOffsets,
      [styles["default-block--vertical-offsets"]]: verticalOffsets,
      [styles["default-block--small"]]: size === SIZES.SMALL,
      [styles["default-block--middle"]]: size === SIZES.MIDDLE,
      [styles["default-block--large"]]: size === SIZES.LARGE,
      [styles["default-block--xlarge"]]: size === SIZES.XLARGE,
      [styles["default-block--table"]]: table
    })}
  >
    {children}
  </div>
);
