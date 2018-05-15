import React from "react";
import { translate } from "react-i18next";

import "./filter-badge.css";

const FilterBadge = ({ t, filter, filtertype, onRemoveFilter }) => {
  const filterValue = t(`programs-filtering.${filter.name}.value-pattern`, {
    value: filter.value
  });

  return (
    <div className="filter-badge">
      <span className="filter-badge__remove" onClick={onRemoveFilter}>
        x
      </span>
      <span className="filter-badge__filter-text">
        <span className="filter-badge__name">
          {t(`programs-filtering.${filter.name}.name`)}
        </span>
        {filterValue && (
          <span className="filter-badge__value">{filterValue}</span>
        )}
      </span>
    </div>
  );
};

export default translate()(FilterBadge);
