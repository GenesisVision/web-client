import React from "react";
import "./filter-pane.css";

const FilterPane = ({ isOpen, onFilterClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="filter-pane-wrapper">
      <div className="filter-pane">{children}</div>
      <div className="filter-pane-backdrop" onClick={onFilterClose} />
    </div>
  );
};

export default FilterPane;
