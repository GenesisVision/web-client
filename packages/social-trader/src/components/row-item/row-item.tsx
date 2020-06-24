import classNames from "classnames";
import React from "react";

import styles from "./row-item.module.scss";

export interface IRowItemProps {
  hide?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  wide?: boolean;
  bottomOffset?: boolean;
  className?: string;
  xsmall?: boolean;
  small?: boolean;
  middle?: boolean;
  xlarge?: boolean;
  large?: boolean;
}

export const RowItem: React.FC<IRowItemProps> = ({
  hide,
  wide,
  onClick,
  middle = true,
  bottomOffset,
  className,
  xsmall,
  small,
  xlarge,
  large,
  children
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles["row-item"], className, {
        [styles["row-item--pointer"]]: !!onClick,
        [styles["row-item--hide"]]: hide,
        [styles["row-item--wide"]]: wide,
        [styles["row-item--bottom-offset"]]: bottomOffset,
        [styles["row-item--xsmall"]]: xsmall,
        [styles["row-item--small"]]: small,
        [styles["row-item--middle"]]:
          middle && !(xlarge || xsmall || small || large),
        [styles["row-item--xlarge"]]: xlarge,
        [styles["row-item--large"]]: large
      })}
    >
      {children}
    </div>
  );
};
