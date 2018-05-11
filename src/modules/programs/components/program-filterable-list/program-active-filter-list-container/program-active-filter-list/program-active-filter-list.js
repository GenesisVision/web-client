import React from "react";
import FilterBadge from "../../../../../filter-pane/components/filter-badge/filter-badge";
import FilterBadgeButton from "../../../../../filter-pane/components/filter-badge/filter-badge-button";

const ProgramActiveFilterList = ({ filters, openFilterPane }) => {
  const showFilterActions = filters.length > 0;
  return (
    <div>
      {filters.map(x => <FilterBadge key={x} filter={x} />)}
      <FilterBadgeButton text="Add New" onClick={openFilterPane} />
      {showFilterActions && <FilterBadgeButton text="Clear All" />}
    </div>
  );
};

export default ProgramActiveFilterList;
