import React from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
  margin-left: 5px;
`;

export const ExportIcon: React.FC = () => (
  <StyledSvg xmlns="http://www.w3.org/2000/svg" width="12" height="14">
    <g fill="none" fillRule="evenodd" stroke="#00BDAF" strokeWidth="2">
      <path d="M.5 13h11M6 10V3M2 5l4-3 4 3" />
    </g>
  </StyledSvg>
);
