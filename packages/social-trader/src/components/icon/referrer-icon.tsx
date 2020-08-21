import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";
import styled from "styled-components";

const StyledIcon = styled(Icon)`
  width: 13px;
  height: 13px;
`;

export const ReferrerIcon: React.FC<IIconProps> = props => (
  <StyledIcon {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99997 8.99993C11.6568 8.99993 12.9999 7.6568 12.9999 5.99997C12.9999 4.34313 11.6568 3 9.99997 3C8.34313 3 7 4.34313 7 5.99997C7 7.6568 8.34313 8.99993 9.99997 8.99993Z"
        stroke="#525E67"
        strokeWidth="1.5"
      />
      <path
        d="M4 20V17C4 14.2736 6.99997 12.0001 9.99993 12.0001C11.4451 12.0001 12.8902 12.5277 14 13.3793"
        stroke="#525E67"
        strokeWidth="1.5"
      />
      <path d="M17 14V20" stroke="#525E67" strokeWidth="1.5" />
      <path d="M20 17L14 17" stroke="#525E67" strokeWidth="1.5" />
    </svg>
  </StyledIcon>
);
