import classNames from "classnames";
import React from "react";

import "./row.scss";

export const Row: React.FC<Props> = props => {
  const {
    middle = true,
    hide,
    center = true,
    className,
    wrap,
    small,
    large,
    children,
    ...tail
  } = props;
  return (
    <div
      {...tail}
      className={classNames("row", className, {
        "row--hidden": hide,
        "row--center": center,
        "row--wrap": wrap,
        "row--small": small,
        "row--middle": middle && !(small || large),
        "row--large": large
      })}
    >
      {children}
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hide?: boolean;
  center?: boolean;
  className?: string;
  wrap?: boolean;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
}
