import React from "react";
import "./filter-badge.css";

const FilterBadge = ({ filter, removeFilter }) => {
  return (
    <div className="filter-badge">
      <span className="filter-badge__remove" onClick={removeFilter}>
        x
      </span>
      <span className="filter-badge__filter-text">
        <span>Filter:</span> <span>$40,000</span>
      </span>
    </div>
  );
};

export default FilterBadge;
