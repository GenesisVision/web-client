import { ButtonIcon } from "components/button-icon/button-icon";
import React from "react";

export const MediaIcon: React.FC = () => {
  return (
    <ButtonIcon>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="3"
          width="18"
          height="14"
          stroke="#fff"
          stroke-width="2"
        />
        <path
          d="M2.5 17L7.5 12L10.5 15L15.5 10L19 13.5"
          stroke="#fff"
          stroke-width="2"
        />
        <circle cx="5.5" cy="7.5" r="1.5" fill="#fff" />
      </svg>
    </ButtonIcon>
  );
};
