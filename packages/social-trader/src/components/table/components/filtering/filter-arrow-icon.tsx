import * as React from "react";
import styled from "styled-components";
import { $iconColor, $primaryColor } from "utils/style/colors";

interface Props {
  isOpen?: boolean;
  hover?: boolean;
}

const StyledSvg = styled.svg<Props>`
  stroke: ${({ isOpen, hover }) =>
    isOpen || hover ? $primaryColor : $iconColor};
`;

const _FilterArrowIcon: React.FC<Props> = ({ hover, isOpen }) => (
  <StyledSvg
    hover={hover}
    isOpen={isOpen}
    width="6"
    height="4"
    viewBox="0 0 6 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L3 3L5 1"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);

const FilterArrowIcon = React.memo(_FilterArrowIcon);

export default FilterArrowIcon;
