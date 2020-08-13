import {
  RowItemDynamicStyles,
  RowItemStaticStyles
} from "components/row-item/row-item.style";
import { IRowItemProps } from "components/row-item/row-item.types";
import { withStyles } from "decorators/withStyles";
import React from "react";

const _RowItem: React.FC<IRowItemProps> = ({
  onClick,
  className,
  children
}) => {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};

export const RowItem = withStyles({
  dynamicStyles: RowItemDynamicStyles,
  staticStyles: RowItemStaticStyles
})(_RowItem);
