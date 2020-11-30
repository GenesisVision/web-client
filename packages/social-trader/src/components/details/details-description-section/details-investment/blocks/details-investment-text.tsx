import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 48px;
`;

const _DetailsInvestmentText: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <TextContainer>
      <Text muted preWrap>
        {children}
      </Text>
    </TextContainer>
  );
};

export const DetailsInvestmentText = React.memo(_DetailsInvestmentText);
