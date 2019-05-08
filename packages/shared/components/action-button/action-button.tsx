import "./action-button.scss";

import React from "react";
import GVButton from "shared/components/gv-button";

interface IActionButtonProps {
  onClick?(): void;
  text: string;
}

const ActionButton: React.FC<IActionButtonProps> = ({ onClick, text }) => (
  <GVButton color="secondary" className="action-button" onClick={onClick}>
    {text}
  </GVButton>
);

export default ActionButton;
