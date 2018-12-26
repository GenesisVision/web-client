import React from "react";
import { Icon } from "shared/components/icon/icon";

export const RingIcon = props => {
  const { ...other } = props;
  return (
    <Icon type={"ring"} {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="28"
        fill="none"
        viewBox="0 0 15 18"
      >
        <path
          stroke="white"
          strokeWidth="1.5"
          d="M13.9375 13.2059l-1.125-2.8833V6.47823C12.8125 3.45252 10.4202 1 7.46875 1 4.51731 1 2.125 3.45252 2.125 6.47823v3.84437L1 13.2059h12.9375zM3.9375 16.2649H11"
        />
      </svg>
    </Icon>
  );
};
