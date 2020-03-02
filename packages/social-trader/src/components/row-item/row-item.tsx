import "./row-item.scss";

import classNames from "classnames";
import React from "react";

export const RowItem: React.FC<Props> = ({ small, large, children }) => {
  return (
    <div
      className={classNames("row-item", {
        "row-item--small": small,
        "row-item--large": large
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  small?: boolean;
  large?: boolean;
}
