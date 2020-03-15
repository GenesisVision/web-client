import "./center.scss";

import classNames from "classnames";
import React from "react";

export const Center: React.FC<Props> = ({
  className,
  children,
  center = true,
  ...otherProps
}) => {
  return (
    <div
      {...otherProps}
      className={classNames(className, {
        center: center
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
