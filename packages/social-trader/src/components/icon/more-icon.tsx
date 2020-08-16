import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const MoreIcon: React.FC<IIconProps> = props => (
  <Icon {...props}>
    <svg
      width="18"
      height="8"
      viewBox="0 0 18 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#5A6167" strokeWidth="1.5">
        <circle cx="4" cy="4" r="3" />
        <circle cx="13" cy="4" r="3" />
      </g>
    </svg>
  </Icon>
);
