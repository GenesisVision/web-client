import React from "react";
import "./filter.css";

const Filter = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return <div className="filter">{children}</div>;
};

export default Filter;
