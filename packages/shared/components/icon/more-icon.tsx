import * as React from "react";
import { Icon, IIconProps } from "shared/components/icon/icon";

export const MoreIcon: React.FC<IIconProps> = props => (
  <Icon type={"more"} {...props}>
    <svg
      width="18"
      height="8"
      viewBox="0 0 18 8"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#5A6167" strokeWidth="1.5">
        <circle cx="3" cy="3" r="3" />
        <circle cx="13" cy="3" r="3" />
      </g>
    </svg>
  </Icon>
);
