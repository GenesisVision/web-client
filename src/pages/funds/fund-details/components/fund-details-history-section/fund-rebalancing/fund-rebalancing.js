import "./fund-rebalancing.scss";

import { TableCell, TableRow } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "modules/table/components/table-module";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import {
  FUND_REBALANCING_COLUMNS,
  FUND_REBALANCING_DEFAULT_FILTERS,
  FUND_REBALANCING_FILTERS
} from "../../../fund-details.constants";
import * as service from "../../../services/fund-details.service";

class FundRebalancing extends Component {
  fetchFundRebalancing = filters => {
    const { programId, fundId, currency } = this.props;
    return service.getFundRebalancing(programId, filters).then(({ data }) => {
      return { items: data.trades, total: data.total };
    });
  };

  render() {
    const { t, trades } = this.props;
    let data = { trades: null, total: 0 };
    if (trades) {
      data.items = trades.trades;
      data.total = trades.total;
    }

    return (
      <TableModule
        fetchOnMount={false}
        data={data}
        getItems={this.fetchFundRebalancing}
        defaultFilters={FUND_REBALANCING_DEFAULT_FILTERS}
        filtering={FUND_REBALANCING_FILTERS}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
            />
          </Fragment>
        )}
        paging={DEFAULT_PAGING}
        columns={FUND_REBALANCING_COLUMNS}
        renderHeader={column => (
          <span
            className={`program-details-trades__head-cell program-details-trades__cell--${
              column.name
            }`}
          >
            {t(`fund-details-page.history.trades.${column.name}`)}
          </span>
        )}
        renderBodyRow={rebalance => (
          <TableRow className="program-details-trades__row">
            <TableCell className="program-details-trades__cell program-details-trades__cell--direction">
              {rebalance.name}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--direction">
              {rebalance.symbol}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--direction">
              {rebalance.assertPart}
            </TableCell>
            {/*<TableCell className="program-details-trades__cell program-details-trades__cell--direction">
              <BaseProfitability
                isPositive={rebalance.direction === "Buy"}
                isNegative={rebalance.direction === "Sell"}
              >
                {rebalance.direction}
              </BaseProfitability>
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--symbol">
              {rebalance.symbol}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--volume">
              <NumberFormat
                value={rebalance.volume}
                decimalScale={8}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--price">
              <NumberFormat
                value={rebalance.price}
                decimalScale={8}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--profit">
              <Profitability value={rebalance.profit} prefix="sign">
                <NumberFormat
                  value={this.parseNumber(rebalance.profit)}
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--date">
              {moment(rebalance.date).format("DD-MM-YYYY, hh:mm a")}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--ticket">
              {rebalance.ticket}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--entry">
              {rebalance.entry}
            </TableCell>*/}
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(FundRebalancing);
