import { IDefaultBlockProps } from "components/default.block/default.block.types";
import React from "react";

import { DefaultBlock } from "./default.block";

export const DefaultTableBlock: React.FC<IDefaultBlockProps> = props => {
  return (
    <DefaultBlock
      size={"xlarge"}
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
