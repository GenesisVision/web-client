import { Center } from "components/center/center";
import { RowDynamicStyles } from "components/row/row.style";
import { withStyles } from "decorators/withStyles";
import React from "react";

import { IRowProps } from "./row.types";

const _Row: React.FC<IRowProps> = ({
  size = "middle",
  onlyOffset,
  center = true,
  wide,
  hide,
  className,
  children,
  ...otherProps
}) => {
  return (
    <Center
      {...otherProps}
      center={center && !onlyOffset}
      className={className}
    >
      {children}
    </Center>
  );
};

export const Row = withStyles({ dynamicStyles: RowDynamicStyles })(_Row);
