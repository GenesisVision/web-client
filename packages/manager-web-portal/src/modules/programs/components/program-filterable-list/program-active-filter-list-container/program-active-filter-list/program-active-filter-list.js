import React from "react";

import FilterBadge from "../../../../../filter-pane/components/filter-badge/filter-badge";
import FilterBadgeButton from "../../../../../filter-pane/components/filter-badge/filter-badge-button";

const ProgramActiveFilterList = ({
  filters,
  openFilterPane,
  clearFilter,
  clearFilters
}) => {
  const showFilterActions = filters.length > 0;
  return (
    <div>
      {filters.map(x => (
        <FilterBadge
          key={x.name}
          filter={x}
          onRemoveFilter={clearFilter(x.name)}
        />
      ))}
      <FilterBadgeButton text="Add Filter" onClick={openFilterPane} />
      {showFilterActions && (
        <FilterBadgeButton text="Clear Filter" onClick={clearFilters} />
      )}
    </div>
  );
};

export default ProgramActiveFilterList;
