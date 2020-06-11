import classNames from "classnames";
import { Center } from "components/center/center";
import React from "react";

import styles from "./row.module.scss";

export const Row: React.FC<Props> = ({
  xlarge,
  onlyOffset,
  center = true,
  wide,
  middle = true,
  hide,
  className,
  xsmall,
  small,
  large,
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
        [styles["row--xsmall"]]: xsmall,
        [styles["row--small"]]: small,
        [styles["row--middle"]]:
          middle && !(xsmall || small || large || xlarge),
        [styles["row--xlarge"]]: xlarge,
        [styles["row--large"]]: large
      })}
    >
      {children}
    </Center>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  xlarge?: boolean;
  onlyOffset?: boolean;
  wide?: boolean;
  hide?: boolean;
  center?: boolean;
  className?: string;
  wrap?: boolean;
  xsmall?: boolean;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
}
