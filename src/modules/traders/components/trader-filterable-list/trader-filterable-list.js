import React from "react";

import FilterContainer from "../../../filter/components/filter-container";
import TraderFilterableListContainer from "./trader-list-container/trader-list-container";
import TraderListFilter from "./trader-list-filter/trader-list-filter";
import withQueryParams from "../../../../shared/hoc/with-query-params/with-query-params";

const TraderFilterableList = ({ queryParams }) => {
  const defaultFilterValues = {
    levelMin: 0,
    levelMax: 10,
    profiAvg: 0
  };
  return (
    <FilterContainer
      defaultFilterValues={defaultFilterValues}
      filterComponent={TraderListFilter}
      component={TraderFilterableListContainer}
    />
  );
};

export default withQueryParams(TraderFilterableList);
