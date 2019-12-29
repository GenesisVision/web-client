import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const InvestIcon: React.FC<IIconProps> = props => (
  <Icon type={"invest"} {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5.57143C14.3772 4.59269 13.2975 4 12.1374 4H8C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10H12C13.6569 10 15 11.3431 15 13C15 14.6569 13.6569 16 12 16H7.86263C6.70253 16 5.62283 15.4073 5 14.4286"
        stroke="#00BDAF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 4L10 1" stroke="#00BDAF" strokeWidth="2" />
      <path d="M10 19L10 16" stroke="#00BDAF" strokeWidth="2" />
    </svg>
  </Icon>
);
