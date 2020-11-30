import * as React from "react";
import { Sizeable } from "utils/types";

export interface IDefaultBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Sizeable {
  tall?: boolean;
  light?: boolean;
  roundedBorder?: boolean;
  hoverable?: boolean;
  className?: string;
  wide?: boolean;
  solid?: boolean;
  bordered?: boolean;
  horizontalOffsets?: boolean;
  verticalOffsets?: boolean;
  table?: boolean;
}
