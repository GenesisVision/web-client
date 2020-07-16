import { ButtonIcon } from "components/button-icon/button-icon";
import { PinIcon } from "components/conversation/icons/pin.icon";
import React from "react";

export const PinButton: React.FC = () => {
  return (
    <ButtonIcon>
      <PinIcon />
    </ButtonIcon>
  );
};
