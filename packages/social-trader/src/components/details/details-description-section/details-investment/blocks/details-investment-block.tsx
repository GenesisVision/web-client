import React from "react";
import styled from "styled-components";
import { horizontalPaddings } from "utils/style/mixins";
import { $paddingSmall } from "utils/style/sizes";

const Container = styled.div`
  ${horizontalPaddings($paddingSmall)}
`;

const _DetailsInvestmentBlock: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return <Container>{children}</Container>;
};

export const DetailsInvestmentBlock = React.memo(_DetailsInvestmentBlock);
