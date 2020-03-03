import "./row-item.scss";

import classNames from "classnames";
import React from "react";

export const RowItem: React.FC<Props> = ({
  bottomOffset,
  className,
  small,
  large,
  children
}) => {
  return (
    <div
      className={classNames("row-item", className, {
        "row-item--bottom-offset": bottomOffset,
        "row-item--small": small,
        "row-item--large": large
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  bottomOffset?: boolean;
  className?: string;
  small?: boolean;
  large?: boolean;
}
