import React from "react";
import "./filter-pane.css";
import classnames from "classnames";

const FilterPane = ({ isOpen, children, className }) => {
  if (!isOpen) {
    return null;
  }

  return <div className={classnames("filter-pane", className)}>{children}</div>;
};

export default FilterPane;
