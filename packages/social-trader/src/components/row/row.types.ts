import React from "react";
import { Sizeable } from "utils/types";

export interface IRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Sizeable {
  onlyOffset?: boolean;
  wide?: boolean;
  hide?: boolean;
  center?: boolean;
  wrap?: boolean;
}
