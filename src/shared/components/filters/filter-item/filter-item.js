import React from "react";
import "./filter-item.css";

const FilterItem = ({ title, description, component: Component, onChange }) => {
  return (
    <div className="filter-item">
      <div className="filter-item__title">{title}</div>
      <div className="filter-item__description">{description}</div>
      <div>
        <Component />
      </div>
    </div>
  );
};

export default FilterItem;
