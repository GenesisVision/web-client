import { ButtonIcon } from "components/button-icon/button-icon";
import { CloseIconSVGSource } from "components/icon/close-icon-svg-source";
import React from "react";

interface Props {
  disabled?: boolean;
}

export const RemoveIcon: React.FC<Props> = ({ disabled }) => {
  return (
    <ButtonIcon disabled={disabled}>
      <CloseIconSVGSource />
    </ButtonIcon>
  );
};
