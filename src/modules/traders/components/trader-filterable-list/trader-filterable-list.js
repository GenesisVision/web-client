import React from "react";

import FilterContainer from "../../../filter/components/filter-container";
import TraderListContainer from "./trader-list-container/trader-list-container";
import TraderListFilter from "./trader-list-filter/trader-list-filter";

const TraderFilterableList = ({ queryParams }) => {
  const defaultFilterValues = {
    levelMin: 0,
    levelMax: 10,
    profitAvg: 0
  };
  return (
    <div>
      <FilterContainer>
        <TraderListFilter />
      </FilterContainer>
      <TraderListContainer />
    </div>
  );
};

export default TraderFilterableList;
