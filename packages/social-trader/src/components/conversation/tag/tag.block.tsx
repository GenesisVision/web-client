import { DefaultBlock } from "components/default.block/default.block";
import React from "react";

export const TagBlock: React.FC = ({ children }) => {
  return (
    <DefaultBlock bordered horizontalOffsets={false} verticalOffsets={false}>
      <DefaultBlock size={"small"}>{children}</DefaultBlock>
    </DefaultBlock>
  );
};
