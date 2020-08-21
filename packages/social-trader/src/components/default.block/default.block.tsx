import { defaultBlockDynamicStyles } from "components/default.block/default.block.style";
import { IDefaultBlockProps } from "components/default.block/default.block.types";
import * as React from "react";
import styled from "styled-components";

const StyledDiv = styled.div<IDefaultBlockProps>`
  ${defaultBlockDynamicStyles}
`;

const _DefaultBlock: React.FC<IDefaultBlockProps> = props => (
  <StyledDiv {...props} />
);

export const DefaultBlock = React.memo(_DefaultBlock);
