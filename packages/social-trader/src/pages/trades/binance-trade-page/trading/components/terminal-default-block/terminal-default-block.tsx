import { DefaultBlock } from "components/default.block/default.block";
import { SIZES } from "constants/constants";
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
      size={SIZES.SMALL}
      horizontalOffsets={horizontalOffsets}
      roundedBorder={false}
      bordered
      className={className}
    >
      {children}
    </DefaultBlock>
  );
};
