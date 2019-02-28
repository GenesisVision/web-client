import "./action-button.scss";

import { GVButton } from "gv-react-components";
import React from "react";

const ActionButton = ({ onClick, text }) => (
  <GVButton color="secondary" className="action-button" onClick={onClick}>
    {text}
  </GVButton>
);
export default ActionButton;
