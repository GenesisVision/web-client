import { Row } from "components/row/row";
import React from "react";
import styled from "styled-components";
import { $paddingSmall } from "utils/style/sizes";

const StyledRow = styled(Row)`
  margin-right: ${$paddingSmall / 2}px;
`;

const HeaderIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children
}) => <StyledRow className={className}>{children}</StyledRow>;

export default HeaderIcon;
