import classNames from "classnames";
import { Center } from "components/center/center";
import React from "react";

import "./row.scss";

export const Row: React.FC<Props> = ({
  xlarge,
  onlyOffset,
  center = true,
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
      center={center && !onlyOffset}
      className={classNames("row", className, {
        "row--flex": !onlyOffset,
        "row--wide": wide,
        "row--hidden": hide,
        "row--small": small,
        "row--middle": middle && !(small || large),
        "row--xlarge": xlarge,
        "row--large": large
      })}
    >
      {children}
    </Center>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  xlarge?: boolean;
  onlyOffset?: boolean;
  wide?: boolean;
  hide?: boolean;
  center?: boolean;
  className?: string;
  wrap?: boolean;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
}
