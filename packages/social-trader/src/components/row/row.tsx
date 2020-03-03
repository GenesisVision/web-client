import "./row.scss";

import classNames from "classnames";
import React from "react";

export const Row: React.FC<Props> = ({
  center = true,
  onClick,
  className,
  wrap,
  small,
  large,
  children
}) => {
  return (
    <div
      onClick={onClick}
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

interface Props {
  center?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  wrap?: boolean;
  small?: boolean;
  large?: boolean;
}
