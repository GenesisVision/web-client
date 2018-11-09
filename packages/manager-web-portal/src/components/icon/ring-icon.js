import { Icon } from "shared/components/icon/icon";
import React from "react";

export const RingIcon = props => {
  const { ...other } = props;
  return (
    <Icon type={"ring"} {...other}>
      <svg
        width="15"
        height="18"
        viewBox="0 0 15 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="13"
          height="17"
          fill="black"
          fillOpacity="0"
          transform="translate(1 1)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.9375 13.2059L12.8125 10.3226V6.47823C12.8125 3.45252 10.4202 1 7.46875 1C4.51731 1 2.125 3.45252 2.125 6.47823V10.3226L1 13.2059H13.9375Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M3.9375 16.2649H11"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};
