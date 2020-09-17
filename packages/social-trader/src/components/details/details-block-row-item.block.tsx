import { $paddingXsmall } from "components/gv-styles/gv-sizes";
import * as React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding-right: ${$paddingXsmall}px;
`;

export const DetailsBlockRowItem: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};
