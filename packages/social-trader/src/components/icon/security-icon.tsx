import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";
import styled from "styled-components";

const StyledIcon = styled(Icon)`
  svg [fill] {
    fill: none;
  }
`;

export const SecurityIcon: React.FC<IIconProps> = props => (
  <StyledIcon {...props}>
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="a" filterUnits="objectBoundingBox">
          <feOffset dy="32" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="22"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.145805027 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="" d="M-1214-336H386v1834h-1600z" />

        <g filter="url(#a)" transform="translate(-24 -211)">
          <rect width="290" height="304" fill="" rx="8" />
          <path
            stroke="#525E67"
            strokeWidth="1.5"
            d="M26 214.01640008c-.00270637-.16858983.1157019-.33624019.32226467-.39362908.88004906-.2444964 2.53302706-.76425003 3.89006478-1.54916384.16876702-.0976305.3783862-.09805282.54625302-.00178842 1.38361521.79322242 3.04929467 1.31627278 3.91790684 1.55812318.19787365.05509195.31404297.2120592.31824393.37293943.02512001.9630232-.0182613 2.90719514-.61316826 4.76995304-.59443542 1.86129268-1.71257586 3.56860891-3.79423581 4.21295721-.06340016.019651-.1351165.018703-.19551597-.0015083-1.91372026-.6407715-3.01032866-2.3309361-3.63397787-4.19248735-.62179737-1.85603516-.74179471-3.79593644-.75783533-4.77539587z"
          />
        </g>
      </g>
    </svg>
  </StyledIcon>
);
