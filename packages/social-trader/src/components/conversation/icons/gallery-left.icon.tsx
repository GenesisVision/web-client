import { ButtonIcon } from "components/button-icon/button-icon";
import React from "react";

export const GalleryLeftIcon: React.FC = () => {
  return (
    <ButtonIcon>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 1L6 10L15 19" stroke="white" stroke-width="2" />
      </svg>
    </ButtonIcon>
  );
};
