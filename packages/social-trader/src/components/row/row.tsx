import "./row.scss";

import classNames from "classnames";
import React from "react";

export const Row: React.FC<Props> = props => {
  const { center = true, className, wrap, small, large, children } = props;
  return (
    <div
      {...props}
      className={classNames("row", className, {
        "row--center": center,
        "row--wrap": wrap,
        "row--small": small,
        "row--large": large
      })}
    >
      {children}
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  center?: boolean;
  className?: string;
  wrap?: boolean;
  small?: boolean;
  large?: boolean;
}
