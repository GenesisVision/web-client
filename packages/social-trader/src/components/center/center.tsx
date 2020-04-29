import classNames from "classnames";
import React from "react";

import "./center.scss";

export const Center: React.FC<Props> = ({
  wrap,
  className,
  children,
  center = true,
  ...otherProps
}) => {
  return (
    <div
      {...otherProps}
      className={classNames(className, {
        center: center,
        "center--wrap": wrap
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
