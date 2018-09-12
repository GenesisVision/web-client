import "./program-trades.scss";

import NumberProfitability from "components/number-profitability/number-profitability";
import {
  Table,
  TableCell,
  TableHeadCell,
  TableRow
} from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import withTable from "modules/table/components/with-table";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import moment from "moment";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";

import {
  PROGRAM_TRADES_COLUMNS,
  PROGRAM_TRADES_FILTERS,
  PROGRAM_TRADES_SORTING
} from "../../../program-details.constants";
import { fetchProgramTrades } from "../../../services/program-details.service";

const ProgramTrades = ({
  t,
  isPending,
  data,
  filtering,
  updateFilter,
  paging,
  updatePaging,
  sorting,
  updateSorting
}) => (
  <Table
    filtering={filtering}
    sorting={sorting}
    updateSorting={updateSorting}
    renderFilters={() => (
      <Fragment>
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
        />
      </Fragment>
    )}
    paging={paging}
    updatePaging={updatePaging}
    columns={PROGRAM_TRADES_COLUMNS}
    items={data.trades}
    isPending={data.isPending}
    renderHeader={({ column, sortingName, isAsc }) => (
      <TableHeadCell
        key={column.name}
        className={`program-details-trades__cell--${column.name}`}
        sortable={false}
        active={false}
      >
        {t(`program-details-page.history.trades.${column.name}`)}
      </TableHeadCell>
    )}
    renderBodyRow={trade => (
      <TableRow>
        <TableCell className="program-details-trades__cell program-details-trades__cell--direction">
          {trade.direction}
        </TableCell>
        <TableCell className="program-details-trades__cell program-details-trades__cell--symbol">
          {trade.symbol}
        </TableCell>
        <TableCell className="program-details-trades__cell program-details-trades__cell--volume">
          <NumberFormat
            value={trade.volume}
            decimalScale={2}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="program-details-trades__cell program-details-trades__cell--price">
          <NumberFormat
            value={trade.price}
            decimalScale={5}
            displayType="text"
            thousandSeparator=" "
          />
        </TableCell>
        <TableCell className="program-details-trades__cell program-details-trades__cell--profit">
          <NumberProfitability value={trade.profit}>
            <NumberFormat
              value={trade.profit}
              decimalScale={2}
              displayType="text"
            />
          </NumberProfitability>
        </TableCell>
        <TableCell className="program-details-trades__cell program-details-trades__cell--date">
          {moment(trade.date).format("DD-MM-YYYY, hh:mm a")}
        </TableCell>
        <TableCell className="program-details-trades__cell program-details-trades__cell--ticket">
          {trade.ticket}
        </TableCell>

        <TableCell className="program-details-trades__cell program-details-trades__cell--entry">
          {trade.entry}
        </TableCell>
      </TableRow>
    )}
  />
);

export default compose(
  translate(),
  withTable({
    fetchOnMount: true,
    getItems: fetchProgramTrades,
    paging: DEFAULT_PAGING,
    sorting: PROGRAM_TRADES_SORTING,
    filtering: {
      dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
    },
    defaultFilters: PROGRAM_TRADES_FILTERS
  })
)(ProgramTrades);
