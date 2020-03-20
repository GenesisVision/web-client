import classNames from "classnames";
import { Center } from "components/center/center";
import React from "react";

import "./row.scss";

export const Row: React.FC<Props> = ({
  wide,
  middle = true,
  hide,
  className,
  small,
  large,
  children,
  ...otherProps
}) => {
  return (
    <Center
      {...otherProps}
      className={classNames("row", className, {
        "row--wide": wide,
        "row--hidden": hide,
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
  wide?: boolean;
  hide?: boolean;
  center?: boolean;
  className?: string;
  wrap?: boolean;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
}
