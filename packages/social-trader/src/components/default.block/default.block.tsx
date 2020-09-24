import { defaultBlockDynamicStyles } from "components/default.block/default.block.style";
import { IDefaultBlockProps } from "components/default.block/default.block.types";
import * as React from "react";
import LazyHydrate from "react-lazy-hydration";
import styled from "styled-components";

const StyledDiv = styled.div<IDefaultBlockProps>`
  ${defaultBlockDynamicStyles}
`;

const _DefaultBlock: React.FC<IDefaultBlockProps> = props => (
  <LazyHydrate whenVisible>
    <StyledDiv {...props} />
  </LazyHydrate>
);

export const DefaultBlock = React.memo(_DefaultBlock);
