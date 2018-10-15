import "./funds-table.scss";

import { Table } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import React, { Fragment } from "react";
import { translate } from "react-i18next";

import { FUNDS_TABLE_COLUMNS } from "../../funds-table.constants";
import FundsTableRow from "./fund-table-row";

const FundsTable = ({
  t,
  data,
  isPending,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  paging,
  updatePaging,
  toggleFavorite,
  isAuthenticated,
  title
}) => {
  return (
    <Table
      title={title}
      sorting={sorting}
      updateSorting={updateSorting}
      paging={paging}
      updatePaging={updatePaging}
      columns={FUNDS_TABLE_COLUMNS}
      items={data.funds}
      isPending={data.isPending}
      renderFilters={() => (
        <Fragment>
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
          />
        </Fragment>
      )}
      renderHeader={column => {
        if (!isAuthenticated && column.name === "favorite") return null;
        return (
          <span className={`funds-table__cell--${column.name}`}>
            {t(`funds-page.funds-header.${column.name}`)}
          </span>
        );
      }}
      renderBodyRow={fund => (
        <FundsTableRow
          fund={fund}
          toggleFavorite={toggleFavorite}
          isAuthenticated={isAuthenticated}
        />
      )}
    />
  );
};

export default translate()(FundsTable);
