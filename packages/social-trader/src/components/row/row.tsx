import "./row.scss";

import classNames from "classnames";
import { Center } from "components/center/center";
import React from "react";

export const Row: React.FC<Props> = props => {
  const {
    middle = true,
    hide,
    className,
    wrap,
    small,
    large,
    children
  } = props;
  return (
    <Center
      {...props}
      className={classNames("row", className, {
        "row--hidden": hide,
        "row--wrap": wrap,
        "row--small": small,
        "row--middle": middle && !(small || large),
        "row--large": large
      })}
    >
      {children}
    </Center>
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
