import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const NewsIcon: React.FC<IIconProps> = props => (
  <Icon {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H1.25571C4.05408 1 6.8213 1.58724 9.37848 2.72377L10 3L10.6215 2.72377C13.1787 1.58725 15.9459 1 18.7443 1H19V19H18.7443C15.9459 19 13.1787 18.4128 10.6215 17.2762L10 17L9.37848 17.2762C6.8213 18.4128 4.05408 19 1.25571 19H1V1Z"
        stroke="#FFFFFF"
        stroke-width="2"
      />
      <path d="M11 12H16" stroke="#FFFFFF" stroke-width="2" />
      <path d="M4 12H9" stroke="#FFFFFF" stroke-width="2" />
      <path d="M4 8H9" stroke="#FFFFFF" stroke-width="2" />
    </svg>
  </Icon>
);
