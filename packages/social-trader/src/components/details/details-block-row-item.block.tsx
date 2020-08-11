import { $paddingXsmall } from "components/gv-styles/gv-sizes";
import { withStyles } from "decorators/withStyles";
import * as React from "react";

const staticStyles = {
  "padding-right": { value: $paddingXsmall, unit: "px" }
};

export const _DetailsBlockRowItem: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const DetailsBlockRowItem = withStyles({ staticStyles })(
  _DetailsBlockRowItem
);
