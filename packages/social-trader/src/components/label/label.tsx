import "./label.scss";

import React from "react";

const Label: React.FC = ({ children }) => {
  return <div className="label">{children}</div>;
};

export default Label;
