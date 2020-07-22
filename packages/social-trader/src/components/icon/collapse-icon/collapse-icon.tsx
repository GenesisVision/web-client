import { ButtonIcon } from "components/button-icon/button-icon";
import { CollapseIconSource } from "components/icon/collapse-icon/collapse-icon.source";
import React from "react";

const CollapseIcon: React.FC = () => {
  return (
    <ButtonIcon>
      <CollapseIconSource />
    </ButtonIcon>
  );
};

export default CollapseIcon;
