import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const FundsIcon: React.FC<IIconProps> = props => (
  <Icon type={"funds"} {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 19L20 19"
        stroke="#00BDAF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M1 13L4.33434 9.4811L8.05781 12.8487L12.3268 7.35924L14.8723 9.383L19 4"
        stroke="#14BEB4"
        strokeWidth="2"
      />
    </svg>
  </Icon>
);
