import GVButton from "components/gv-button";
import React from "react";

interface IActionButtonProps {
  onClick?(): void;
  text: string;
}

const ActionButton: React.FC<IActionButtonProps> = ({ onClick, text }) => (
  <GVButton color="secondary" onClick={onClick}>
    {text}
  </GVButton>
);

export default ActionButton;
