import { defaultBlockDynamicStyles } from "components/default.block/default.block.style";
import { IDefaultBlockProps } from "components/default.block/default.block.types";
import * as React from "react";
import styled from "styled-components";

export const DefaultBlock = styled.div<IDefaultBlockProps>`
  ${defaultBlockDynamicStyles}
`;
