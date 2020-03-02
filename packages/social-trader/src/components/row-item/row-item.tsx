import "./row-item.scss";

import classNames from "classnames";
import React from "react";

export const RowItem: React.FC<Props> = ({
  className,
  small,
  large,
  children
}) => {
  return (
    <div
      className={classNames("row-item", className, {
        "row-item--small": small,
        "row-item--large": large
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  className?: string;
  small?: boolean;
  large?: boolean;
}
