import { Center } from "components/center/center";
import React from "react";
import styled from "styled-components";

const StyledCenter = styled(Center)`
  justify-content: space-between;
`;

const _DetailsInvestmentFooter: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return <StyledCenter>{children}</StyledCenter>;
};

export const DetailsInvestmentFooter = React.memo(_DetailsInvestmentFooter);
