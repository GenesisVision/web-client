import React from "react";

const FilterBadgeButton = ({ text, onClick }) => {
  return (
    <div className="filter-badge filter-badge--button" onClick={onClick}>
      {text}
    </div>
  );
};

export default FilterBadgeButton;
