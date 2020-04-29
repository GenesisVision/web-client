import { SIZES } from "constants/constants";
import React from "react";

import { DefaultBlock, IDefaultBlockProps } from "./default.block";

export const DefaultTableBlock: React.FC<IDefaultBlockProps> = props => {
  return (
    <DefaultBlock
      size={SIZES.XLARGE}
      horizontalOffsets={false}
      solid
      table
      key={"table"}
      {...props}
    >
      {props.children}
    </DefaultBlock>
  );
};
