import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const FollowIcon: React.FC<IIconProps> = props => (
  <Icon type={"follow"} {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H12C12.5523 1 13 1.44772 13 2V15H1V1Z"
        stroke="#00BDAF"
        strokeWidth="2"
      />
      <path
        d="M13 5H18C18.5523 5 19 5.44772 19 6V19H7V15"
        stroke="#00BDAF"
        strokeWidth="2"
      />
    </svg>
  </Icon>
);
