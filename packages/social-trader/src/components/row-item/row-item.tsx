import "./row-item.scss";

import classNames from "classnames";
import React from "react";

export const RowItem: React.FC<Props> = ({
  onClick,
  middle = true,
  bottomOffset,
  className,
  small,
  large,
  children
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames("row-item", className, {
        "row-item--bottom-offset": bottomOffset,
        "row-item--small": small,
        "row-item--middle": middle && !(small || large),
        "row-item--large": large
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  bottomOffset?: boolean;
  className?: string;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
}
