import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";
import styled from "styled-components";

const StyledIcon = styled(Icon)`
  width: 18px;
  height: 18px;

  svg [stroke] {
    stroke: #b2b2b2;
  }

  &:hover {
    svg [stroke] {
      stroke: white;
    }
  }
`;

export const PencilIcon: React.FC<IIconProps> = props => (
  <StyledIcon {...props}>
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9109 1.00002L2.03693 9.87402L4.12624 11.9633L13.0002 3.08934L10.9109 1.00002Z"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 13.006L4.13224 11.9619L2.04408 9.87378L1 13.006Z"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35266 2.56519L11.4408 4.65334"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </StyledIcon>
);
