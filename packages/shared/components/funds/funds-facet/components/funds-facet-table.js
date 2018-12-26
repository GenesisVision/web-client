import React, { Fragment } from "react";
import { translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import ProgramTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";

import {
  FUNDS_FACET_PAGING,
  FUNDS_FACET_TABLE_FILTERING,
  FUNDS_FACET_TABLE_FILTERS,
  FUNDS_FACET_TABLE_SORTING
} from "./funds-facet.constants";

const ProgramsFacetTable = ({ t, title, ...props }) => {
  return (
    <ProgramTableModule
      renderFilters={(updateFilter, filtering) => (
        <Fragment>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        </Fragment>
      )}
      title={title}
      paging={FUNDS_FACET_PAGING}
      sorting={FUNDS_FACET_TABLE_SORTING}
      filtering={FUNDS_FACET_TABLE_FILTERING}
      defaultFilters={FUNDS_FACET_TABLE_FILTERS}
      {...props}
    />
  );
};

export default translate()(ProgramsFacetTable);
