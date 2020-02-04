import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const TradeIcon: React.FC<IIconProps> = props => (
  <Icon type={"trade"} {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 0V4" stroke="#00BDAF" strokeWidth="2" />
      <path d="M16 2V6" stroke="#00BDAF" strokeWidth="2" />
      <path d="M16 16V20" stroke="#00BDAF" strokeWidth="2" />
      <path d="M4 16V20" stroke="#00BDAF" strokeWidth="2" />
      <rect
        x="1"
        y="4"
        width="6"
        height="12"
        rx="1"
        stroke="#00BDAF"
        strokeWidth="2"
      />
      <rect
        x="13"
        y="6"
        width="6"
        height="10"
        rx="1"
        stroke="#00BDAF"
        strokeWidth="2"
      />
    </svg>
  </Icon>
);
