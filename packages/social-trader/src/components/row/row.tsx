import classNames from "classnames";
import { Center } from "components/center/center";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./row.module.scss";

export const Row: React.FC<Props> = ({
  size = "middle",
  onlyOffset,
  center = true,
  wide,
  hide,
  className,
  children,
  ...otherProps
}) => {
  return (
    <Center
      {...otherProps}
      center={center && !onlyOffset}
      className={classNames(styles["row"], className, {
        [styles["row--pointer"]]: !!otherProps.onClick,
        [styles["row--flex"]]: !onlyOffset,
        [styles["row--wide"]]: wide,
        [styles["row--hidden"]]: hide,
        [styles["row--xsmall"]]: size === "xsmall",
        [styles["row--small"]]: size === "small",
        [styles["row--middle"]]: size === "middle",
        [styles["row--xlarge"]]: size === "xlarge",
        [styles["row--large"]]: size === "large"
      })}
    >
      {children}
    </Center>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: SizesType;
  onlyOffset?: boolean;
  wide?: boolean;
  hide?: boolean;
  center?: boolean;
  className?: string;
  wrap?: boolean;
}
