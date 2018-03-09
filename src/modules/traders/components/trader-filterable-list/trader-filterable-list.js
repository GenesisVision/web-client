import React from "react";

import FilterContainer from "../../../filter/components/filter-container";
import TraderFilterableListContainer from "./trader-list-container/trader-list-container";
import TraderListFilter from "./trader-list-filter/trader-list-filter";
import withQueryParams from "../../../../shared/hoc/with-query-params/with-query-params";

const TraderFilterableList = ({ queryParams }) => (
  <div>
    <FilterContainer>
      <TraderListFilter queryParams={queryParams} />
    </FilterContainer>
    <TraderFilterableListContainer queryParams={queryParams} />
  </div>
);

export default withQueryParams(TraderFilterableList);
