import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const HistoryIcon: React.FC<IIconProps> = props => (
  <Icon type={"history"} {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 10V6H11V10H15V12H11C9.89543 12 9 11.1046 9 10Z"
        fill="#00BDAF"
      />
      <path
        d="M1 10C1 5.02944 5.02944 1 10 1"
        stroke="#00BDAF"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <path
        d="M1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1"
        stroke="#00BDAF"
        strokeWidth="2"
      />
    </svg>
  </Icon>
);
