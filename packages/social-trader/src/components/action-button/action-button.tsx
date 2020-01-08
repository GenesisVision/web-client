import "./action-button.scss";

import GVButton from "components/gv-button";
import React from "react";

interface IActionButtonProps {
  onClick?(): void;
  text: string;
}

const ActionButton: React.FC<IActionButtonProps> = ({ onClick, text }) => (
  <div className="action-button">
    <GVButton color="secondary" onClick={onClick}>
      {text}
    </GVButton>
  </div>
);

export default ActionButton;
