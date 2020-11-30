import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const TerminalIcon: React.FC<IIconProps> = props => (
  <Icon type={"mt5"} {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 20L1 13" stroke="#00BDAF" strokeWidth="2" />
      <path d="M7 20L7 6" stroke="#00BDAF" strokeWidth="2" />
      <path d="M13 20L13 -8.34465e-07" stroke="#00BDAF" strokeWidth="2" />
      <path d="M19 20L19 6" stroke="#00BDAF" strokeWidth="2" />
    </svg>
  </Icon>
);
