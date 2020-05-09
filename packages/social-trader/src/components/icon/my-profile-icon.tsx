import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const MyProfileIcon: React.FC<IIconProps> = props => (
  <Icon {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 8C11.6569 8 13 6.65685 13 5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5C7 6.65685 8.34315 8 10 8Z"
        stroke="#FFFFFF"
        stroke-width="2"
      />
      <path
        d="M16 18V17C16 13.6863 13.3137 11 10 11V11C6.68629 11 4 13.6863 4 17V18"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
);
