import "./close-circle-button.scss";

import { CloseIcon } from "components/icon/close-icon";
import React from "react";

const _CloseCircleButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="close-circle-button" onClick={onClick}>
      <CloseIcon />
    </div>
  );
};

interface Props {
  onClick: VoidFunction;
}

export const CloseCircleButton = React.memo(_CloseCircleButton);
