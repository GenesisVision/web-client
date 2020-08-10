import { Button } from "components/button/button";
import React from "react";

interface IActionButtonProps {
  onClick?(): void;
  text: string;
}

const ActionButton: React.FC<IActionButtonProps> = ({ onClick, text }) => (
  <Button color="secondary" onClick={onClick}>
    {text}
  </Button>
);

export default ActionButton;
