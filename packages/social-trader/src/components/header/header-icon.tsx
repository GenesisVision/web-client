import { $paddingSmall } from "components/gv-styles/gv-sizes";
import { Row } from "components/row/row";
import React from "react";
import styled from "styled-components";

const StyledRow = styled(Row)`
  margin-right: ${$paddingSmall / 2}px;
`;

const HeaderIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children
}) => <StyledRow className={className}>{children}</StyledRow>;

export default HeaderIcon;
