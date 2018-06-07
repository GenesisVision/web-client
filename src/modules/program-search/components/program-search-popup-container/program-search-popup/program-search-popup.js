import React from "react";

import "./program-search-popup.css";

const ProgramSearchPopup = ({ programs }) => {
  return <div className="program-search-popup">{programs.length}</div>;
};

export default ProgramSearchPopup;
