import { Row } from "components/row/row";
import { Text } from "components/text/text";
import * as React from "react";
import styled from "styled-components";

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  line-height: 1.64;
  text-align: center;
`;

export const DialogInfo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => (
  <StyledRow size={"large"}>
    <Text preWrap muted size={"small"}>
      {children}{" "}
    </Text>
  </StyledRow>
);
