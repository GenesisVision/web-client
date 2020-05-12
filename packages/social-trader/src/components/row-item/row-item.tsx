import classNames from "classnames";
import React from "react";

import "./row-item.scss";

export const RowItem: React.FC<Props> = ({
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
      className={classNames("row-item", className, {
        "row-item--wide": wide,
        "row-item--bottom-offset": bottomOffset,
        "row-item--xsmall": xsmall,
        "row-item--small": small,
        "row-item--middle": middle && !(small || large),
        "row-item--xlarge": xlarge,
        "row-item--large": large
      })}
    >
      {children}
    </div>
  );
};

interface Props {
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
