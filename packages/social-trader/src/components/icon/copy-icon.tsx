import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";
import styled from "styled-components";

const StyledIcon = styled(Icon)`
  width: 14px;
`;

const CopyIcon: React.FC<IIconProps> = props => (
  <StyledIcon {...props}>
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.00781"
        y="5.00781"
        width="8.4549"
        height="9.99216"
        rx="1"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M1 9.4549V2.53725C1 1.68825 1.68825 1 2.53725 1H7.91765"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  </StyledIcon>
);

export default CopyIcon;
