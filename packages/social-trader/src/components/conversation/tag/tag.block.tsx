import { DefaultBlock } from "components/default.block/default.block";
import { SIZES } from "constants/constants";
import React from "react";

export const TagBlock: React.FC = ({ children }) => {
  return (
    <DefaultBlock bordered size={SIZES.SMALL}>
      {children}
    </DefaultBlock>
  );
};
