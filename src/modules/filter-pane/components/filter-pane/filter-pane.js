import React from "react";
import "./filter-pane.css";

const FilterPane = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return <div className="filter-pane">{children}</div>;
};

export default FilterPane;
