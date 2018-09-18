import { Icon } from "components/icon/icon";
import React from "react";

export const SettingsIcon = props => {
  return (
    <Icon type={"settings"} {...props}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="1">
          <rect width="12" height="12" fill="black" fill-opacity="0" />
          <path
            d="M6 9.75C8.07107 9.75 9.75 8.07107 9.75 6C9.75 3.92893 8.07107 2.25 6 2.25C3.92893 2.25 2.25 3.92893 2.25 6C2.25 8.07107 3.92893 9.75 6 9.75Z"
            stroke="white"
            stroke-width="1.5"
          />
          <path d="M2.25 6H0" stroke="white" stroke-width="1.5" />
          <path d="M12 6H9.75" stroke="white" stroke-width="1.5" />
          <path d="M6 12V9.75" stroke="white" stroke-width="1.5" />
          <path d="M6 2.25V0" stroke="white" stroke-width="1.5" />
          <rect
            width="1.5"
            height="2.25"
            fill="black"
            fill-opacity="0"
            transform="translate(9.83984 1.5) rotate(45)"
          />
          <path
            d="M8.78102 3.62121L10.372 2.03022"
            stroke="white"
            stroke-width="1.5"
          />
          <rect
            width="1.5"
            height="2.25"
            fill="black"
            fill-opacity="0"
            transform="translate(1.8125 1.5) scale(-1 1) rotate(45)"
          />
          <path
            d="M2.87132 3.62121L1.28033 2.03022"
            stroke="white"
            stroke-width="1.5"
          />
          <rect
            width="1.5"
            height="2.25"
            fill="black"
            fill-opacity="0"
            transform="translate(9.3125 8.25) scale(-1 1) rotate(45)"
          />
          <path
            d="M10.3713 10.3712L8.78033 8.78022"
            stroke="white"
            stroke-width="1.5"
          />
          <rect
            width="1.5"
            height="2.25"
            fill="black"
            fill-opacity="0"
            transform="translate(2.33984 8.25) rotate(45)"
          />
          <path
            d="M1.28102 10.3712L2.87201 8.78022"
            stroke="white"
            stroke-width="1.5"
          />
        </g>
      </svg>
    </Icon>
  );
};
