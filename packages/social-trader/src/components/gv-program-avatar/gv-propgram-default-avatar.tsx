import React from "react";
import styled from "styled-components";
import { adaptiveBorderRadius } from "utils/style/mixins";

export interface GVProgramDefaultAvatarProps {
  color?: string;
}

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  ${adaptiveBorderRadius(7)}
`;

const GVProgramDefaultAvatar: React.FC<GVProgramDefaultAvatarProps> = ({
  color
}) => {
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      fill="none"
      viewBox="0 0 80 80"
    >
      <rect width="80" height="80" fill={color} rx="8" />
      <g fill="#1B232B" opacity=".3">
        <path d="M58 38h-8v18h8zM30 48h-8v8h8zM44 24h-8v32h8z" />
      </g>
    </StyledSvg>
  );
};

GVProgramDefaultAvatar.defaultProps = {
  color: "#131e26"
};

export default GVProgramDefaultAvatar;
