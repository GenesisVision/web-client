import * as React from "react";
import styled from "styled-components";
import { $paddingXsmall } from "utils/style/sizes";

const StyledDiv = styled.div`
  padding-right: ${$paddingXsmall}px;
`;

export const DetailsBlockRowItem: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};
