import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const UsersIcon: React.FC<IIconProps> = props => (
  <Icon {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 8C8.65685 8 10 6.65685 10 5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5C4 6.65685 5.34315 8 7 8Z"
        stroke="#FFFFFF"
        stroke-width="2"
      />
      <path
        d="M13 18V17C13 13.6863 10.3137 11 7 11V11C3.68629 11 1 13.6863 1 17V18"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 9C13.8807 9 15 7.88071 15 6.5C15 5.11929 13.8807 4 12.5 4C11.1193 4 10 5.11929 10 6.5C10 7.88071 11.1193 9 12.5 9Z"
        stroke="#FFFFFF"
        stroke-width="2"
      />
      <path
        d="M18.9171 18C18.441 15.1623 15.973 13 13 13C12.6593 13 12.3252 13.0284 12 13.083"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </Icon>
);
