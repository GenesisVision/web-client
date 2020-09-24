import { DefaultBlock } from "components/default.block/default.block";
import React from "react";

interface Props {
  horizontalOffsets?: boolean;
  className?: string;
}

export const TerminalDefaultBlock: React.FC<Props> = ({
  horizontalOffsets,
  children,
  className
}) => {
  return (
    <DefaultBlock
      size={"small"}
      horizontalOffsets={horizontalOffsets}
      roundedBorder={false}
      bordered
      className={className}
    >
      {children}
    </DefaultBlock>
  );
};
