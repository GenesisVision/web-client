import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const TradeArrowsIcon: React.FC<IIconProps> = props => (
  <Icon type={"trade"} {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 2L5 19" stroke="#00BDAF" strokeWidth="2" />
      <path
        d="M1 6L5 2L9 6"
        stroke="#00BDAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M15 18L15 1" stroke="#00BDAF" strokeWidth="2" />
      <path
        d="M19 14L15 18L11 14"
        stroke="#00BDAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
