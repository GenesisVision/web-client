import "./row.scss";

import classNames from "classnames";
import React from "react";

export const Row: React.FC<Props> = ({ small, large, children }) => {
  return (
    <div
      className={classNames("row", {
        "row--small": small,
        "row--large": large
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
