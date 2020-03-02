import "./row.scss";

import classNames from "classnames";
import React from "react";

export const Row: React.FC<Props> = ({
  className,
  wrap,
  small,
  large,
  children
}) => {
  return (
    <div
      className={classNames("row", className, {
        "row--wrap": wrap,
        "row--small": small,
        "row--large": large
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  className?: string;
  wrap?: boolean;
  small?: boolean;
  large?: boolean;
}
