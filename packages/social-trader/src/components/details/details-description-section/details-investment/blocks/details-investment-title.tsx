import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-transform: uppercase;
`;

const _DetailsInvestmentHeading: React.FC<React.HTMLAttributes<
  HTMLDivElement
>> = ({ children }) => {
  return (
    <Container>
      <Text muted>
        <h5>{children}</h5>
      </Text>
    </Container>
  );
};

export const DetailsInvestmentHeading = React.memo(_DetailsInvestmentHeading);
