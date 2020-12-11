import { Center } from "components/center/center";
import * as React from "react";
import styled from "styled-components";

interface Props {
  wrap?: boolean;
  vertical?: boolean;
}

const StyledCenter = styled(Center)<{ vertical?: boolean }>`
  ${({ vertical }) => (vertical ? ` flex-direction: column;` : "")};
`;

export const StatisticItemList: React.FC<Props &
  React.HTMLAttributes<HTMLDivElement>> = ({
  wrap = true,
  children,
  vertical
}) => (
  <StyledCenter wrap={wrap} vertical={vertical} center={false}>
    {children}
  </StyledCenter>
);
