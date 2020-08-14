import { defaultBlockDynamicStyles } from "components/default.block/default.block.style";
import { IDefaultBlockProps } from "components/default.block/default.block.types";
import { withStyles } from "decorators/withStyles";
import * as React from "react";

const _DefaultBlock: React.FC<IDefaultBlockProps> = ({
  children,
  className
}) => <div className={className}>{children}</div>;

export const DefaultBlock = withStyles<IDefaultBlockProps>({
  dynamicStyles: defaultBlockDynamicStyles
})(_DefaultBlock);
