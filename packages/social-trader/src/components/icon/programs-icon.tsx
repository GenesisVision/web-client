import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const ProgramsIcon: React.FC<IIconProps> = props => (
  <Icon type={"programs"} {...props}>
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
        d="M0 5H2V3H0V5Z"
        fill="#00BDAF"
      />
      <path
        d="M6 4H20"
        stroke="#00BDAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11H2V9H0V11Z"
        fill="#00BDAF"
      />
      <path
        d="M6 10H20"
        stroke="#00BDAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 17H2V15H0V17Z"
        fill="#00BDAF"
      />
      <path
        d="M6 16H20"
        stroke="#00BDAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
