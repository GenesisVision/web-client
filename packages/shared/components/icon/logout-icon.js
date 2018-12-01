import { Icon } from "shared/components/icon/icon";
import React from "react";

export const LogoutIcon = props => {
  return (
    <Icon type={"logout"} {...props}>
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="1"
          d="M6.5 12C9.53757 12 12 9.53757 12 6.5C12 3.46243 9.53757 1 6.5 1C3.46243 1 1 3.46243 1 6.5C1 9.53757 3.46243 12 6.5 12Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <rect
          width="4"
          height="3.2"
          fill="black"
          fillOpacity="0"
          transform="translate(5 5)"
        />
        <g opacity="1">
          <rect
            width="4"
            height="3.2"
            fill="black"
            fillOpacity="0"
            transform="translate(5 5)"
          />
          <path
            d="M6.6 5L5 6.6L6.6 8.2"
            stroke="white"
            strokeLinejoin="round"
          />
          <path d="M5 6.5998H8.70444" stroke="white" />
        </g>
      </svg>
    </Icon>
  );
};
